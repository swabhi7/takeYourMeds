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
    _id: null,
    name: '',
    purpose: '',
    composition: '',
    toBeTakenAt: [],
    myReview: ''
  };
  hoursArr: any[] = [];
  minsArr: any[] = [];
  dose: number;

  constructor(private medService: MedService) { }

  ngOnInit() {
    this.hoursArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.minsArr = [0, 15, 30, 45];   
  }

  doseAdded(e){
    e.preventDefault();
    for(let i = 0; i < this.dose; i++){
      this.med.toBeTakenAt.push({
        hh:9,
        mm:15,
        amorpm:'am',
        taken: false,
        timeup: null,
        hourRem:null,
        minRem:null,
        msgSent:false
      });
    }
  }

  onSubmit(medForm: any){
    medForm.value.toBeTakenAt = this.med.toBeTakenAt;
    medForm.value._id = null;
    this.medService.addMed(medForm.value);
  }
}
