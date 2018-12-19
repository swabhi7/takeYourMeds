import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {Med} from '../models/Med';

import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedService {

  meds:Med[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    this.getMeds().subscribe(medsData => {
      this.meds = medsData.meds;
    });
  }

  getMeds(): Observable<any>{
    return this.http.get('http://localhost:3000/api/meds');
  }

  getMed(id:any): Observable<any>{
    return this.http.get('http://localhost:3000/api/meds/' + id);
  }

  addMed(med:Med){
    this.http.post<{message:string, med:Med}>('http://localhost:3000/api/meds', med).subscribe(medData => {
      this.meds.unshift(medData.med);
      this.router.navigate(['/']);
    });
  }

  editMed(med:Med, isOnlyTakenEdited: boolean){

    this.http.put('http://localhost:3000/api/meds/' + med._id, med).subscribe(result => {
      console.log('result of update - ' + result);
    });
    
    let index:number;
    for(let med1 of this.meds){
      if(med1._id == med._id){
        index = this.meds.indexOf(med1);
      }
    }
    this.meds.splice(index, 1);

    this.meds.unshift(med);

    if(!isOnlyTakenEdited){
      this.router.navigate(['/meds/details']);
    }

  }

  deleteMed(id:any){
    //making the call to delete from server
    this.http.delete('http://localhost:3000/api/meds/' + id).subscribe(result => {
      console.log(result);

      //deleting from local meds array
      let index:number;
      for(let med1 of this.meds){
        if(med1._id == id){
          index = this.meds.indexOf(med1);
        }
      }
      this.meds.splice(index, 1);
    });
  }



}
