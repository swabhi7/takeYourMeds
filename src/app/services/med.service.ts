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
  fetchComplete: boolean = false;

  constructor(private http: HttpClient) { 

    console.log('inside constr');

    this.http.get<{message: string, meds: Med[]}>('http://localhost:3000/api/meds').subscribe((medsData) => {
      this.meds = medsData.meds;
      this.fetchComplete = true;
      console.log('inside http get - done');
    });

    console.log('after');

    /*this.meds = [
      {
        id: 'fdafadds',
        name: 'Medicine 1',
        purpose: 'Keeps Blood Pressure in controll',
        composition: 'paracetamol, nice',
        toBeTakenAt: [{
          hh: 9,
          mm: 0,
          amorpm: 'am',
          taken: false
        }],
        myReview: 'Works great!'
      },
      {
        id: 'fsfadaa',
        name: 'Medicine 2',
        purpose: 'Keeps Diabetes in controll',
        composition: 'paracetamol',
        toBeTakenAt: [{
          hh: 10,
          mm: 15,
          amorpm: 'am',
          taken: false
        }],
        myReview: 'Works!'
      },
      {
        id: 'bhdaskanb',
        name: 'Medicine 3',
        purpose: 'For Migraine',
        composition: 'nice',
        toBeTakenAt: [
          {
            hh: 1,
            mm: 15,
            amorpm: 'pm',
            taken: false
          },
          {
            hh: 9,
            mm: 30,
            amorpm: 'pm',
            taken: false
          }
        ],
        myReview: 'Okay okay'
      }
    ];*/


    
  }

  getMeds(): Observable<Med[]>{
    console.log('inside getMeds()');

    while(this.fetchComplete != true){}

    return of(this.meds);

  }

  getMed(id:string): Observable<Med>{
    console.log('id in service is - ' + id);
    for(let med of this.meds){
      console.log('inside for - id - ' + med.id);
      if(med.id == id){
        console.log('inside if');
        return of(med);
      }
    }
  }

  addMed(med:Med){
    this.meds.unshift(med);
  }

  editMed(med:Med){
    
    let index:number;
    for(let med1 of this.meds){
      if(med1.id == med.id){
        index = this.meds.indexOf(med1);
      }
    }
    this.meds.splice(index, 1);

    this.meds.unshift(med);

  }

  deleteMed(id:string){
    let index:number;
    for(let med1 of this.meds){
      if(med1.id == id){
        index = this.meds.indexOf(med1);
      }
    }
    this.meds.splice(index, 1);

  
  }



}
