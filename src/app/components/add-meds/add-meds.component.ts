import { Component, OnInit, ViewChild } from '@angular/core';
import {Med} from '../../models/Med'; 
import {MedService} from '../../services/med.service';

@Component({
  selector: 'app-add-meds',
  templateUrl: './add-meds.component.html',
  styleUrls: ['./add-meds.component.css']
})
export class AddMedsComponent implements OnInit {

  med: Med = {
    id: '',
    name: '',
    purpose: '',
    composition: '',
    toBeTakenAt: [],
    myReview: ''
  };
  meds: Med[] = [];
  hoursArr: any[] = [];
  minsArr: any[] = [];
  dose: number;

  constructor(private medService: MedService) { }

  ngOnInit() {

    this.hoursArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.minsArr = [0, 15, 30, 45];
    
    /*this.medService.getMeds().subscribe(meds => {
      this.meds = meds;
    });*/
    
  }

  doseAdded(e){
    e.preventDefault();
    this.med.toBeTakenAt = [];
    for(let i = 0; i < this.dose; i++){
      this.med.toBeTakenAt.push({
        hh:3,
        mm:15,
        amorpm:'am',
        taken: false
      });
    }
  }

  onSubmit(medForm: any){
    //console.log(medForm.value);
    //console.log(medForm.valid);
    //medForm.value.toBeTakenAt.hh = 10;
    //medForm.value.toBeTakenAt.mm = 15;
    //this.meds.unshift(medForm.value);
    medForm.value.toBeTakenAt = this.med.toBeTakenAt;
    medForm.value.id = this.generateId();
    this.medService.addMed(medForm.value);
    console.log(medForm.value);
  }

  generateId():string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addUser(){
    //this.med.toBeTakenAt.hh = 10;
    //this.med.toBeTakenAt.mm = 15;
    this.meds.unshift(this.med);
  }

}
