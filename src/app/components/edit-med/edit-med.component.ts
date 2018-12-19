import { Component, OnInit } from '@angular/core';
import {Med} from '../../models/Med'; 
import {MedService} from '../../services/med.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {

  med: Med = {
    _id: null,
    name: '',
    purpose: '',
    composition: '',
    toBeTakenAt: [],
    myReview: ''
  };
  fetchedMed:boolean = false;
  hoursArr: any[] = [];
  minsArr: any[] = [];
  dose: number;
  id1: string = '';
  doseAddedVar: boolean = false;

  constructor(private medService: MedService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.hoursArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.minsArr = [0, 15, 30, 45];
    let id;
    this.route.params.subscribe(params => {
      id = params.id;
    });
    this.id1 = id.toString();
    this.medService.getMed(this.id1).subscribe(med => {
      this.med = med.med;
      this.fetchedMed = true;
    });
  }

  doseAdded(e){
    e.preventDefault();
    this.med.toBeTakenAt = [];
    for(let i = 0; i < this.dose; i++){
      this.med.toBeTakenAt.push({
        hh:9,
        mm:15,
        amorpm:'am',
      });
    }
    this.doseAddedVar = true;
  }

  onSubmit(medForm: any){
    medForm.value.toBeTakenAt = this.med.toBeTakenAt;
    medForm.value._id = this.id1;
    for(let time of medForm.value.toBeTakenAt){
      time.taken = false;
      time.msgSent = false;
      time.timeup = null;
      time.hourRem = null;
      time.minRem = null;
    }
    this.medService.editMed(medForm.value, false);
  }

  

}
