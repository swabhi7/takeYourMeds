import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {Med} from '../models/Med';

import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class MedService {

  meds:Med[] = [];

  backendUrl = environment.apiUrl + '/meds/';

  constructor(private http: HttpClient, private router: Router, private flashMessage: FlashMessagesService) { 
    this.getMeds().subscribe(medsData => {
      this.meds = medsData.meds;
    });
  }

  getMeds(): Observable<any>{
    return this.http.get(this.backendUrl);
  }

  getMed(id:any): Observable<any>{
    return this.http.get(this.backendUrl + id);
  }

  addMed(med:Med){
    this.http.post<{message:string, med:Med}>(this.backendUrl, med).subscribe(medData => {
      this.meds.unshift(medData.med);
      this.flashMessage.show('New medicine added successfully!', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/']);
    });
  }

  editMed(med:Med, isOnlyTakenEdited: boolean){

    this.http.put(this.backendUrl + med._id, med).subscribe(result => {
      console.log('result of update - ' + result);
      let index:number;
      for(let med1 of this.meds){
        if(med1._id == med._id){
          index = this.meds.indexOf(med1);
        }
      }
      this.meds.splice(index, 1);

      this.meds.unshift(med);

      if(!isOnlyTakenEdited){
        this.flashMessage.show('Medicine edited successfully!', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.router.navigate(['/meds/details']);
      }
    });
    
    

  }

  deleteMed(id:any){
    //making the call to delete from server
    this.http.delete(this.backendUrl + id).subscribe(result => {
      console.log(result);

      //deleting from local meds array
      let index:number;
      for(let med1 of this.meds){
        if(med1._id == id){
          index = this.meds.indexOf(med1);
        }
      }
      this.meds.splice(index, 1);

      this.flashMessage.show('Medicine deleted successfully!', {
        cssClass: 'alert-success',
        timeout: 5000
      });

    });
  }



}
