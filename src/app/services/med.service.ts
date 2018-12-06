import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {Med} from '../models/Med';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedService {

  meds:Med[] = [];

  constructor(private http: HttpClient) { 
    this.getMeds().subscribe(medsData => {
      this.meds = medsData.meds;
    });
  }

  getMeds(): Observable<any>{
    return this.http.get('http://localhost:3000/api/meds');
  }

  getMed(id:any): Observable<Med>{
    for(let med of this.meds){
      //console.log('inside for - id - ' + med.id);
      if(med._id == id){
        console.log('inside if');
        return of(med);
      }
    }
  }

  addMed(med:Med){
    this.http.post<{message:string, med:Med}>('http://localhost:3000/api/meds', med).subscribe(medData => {
      this.meds.unshift(medData.med);
    });
  }

  editMed(med:Med){
    
    let index:number;
    for(let med1 of this.meds){
      if(med1._id == med._id){
        index = this.meds.indexOf(med1);
      }
    }
    this.meds.splice(index, 1);

    this.meds.unshift(med);

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
