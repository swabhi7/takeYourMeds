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
    id: '',
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

  constructor(private medService: MedService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

    this.hoursArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.minsArr = [0, 15, 30, 45];

    //let id = +this.route.snapshot.paramMap.get('id');
    let id;
    this.route.params.subscribe(params => {
      id = params.id;
      console.log(params);
    });
    console.log('id is - ' + id);
    this.id1 = id.toString();
    console.log('id1 is - ' + this.id1);

    this.medService.getMed(this.id1).subscribe(med => {
      console.log(med.name);
      this.med = med;
      this.fetchedMed = true;
    });

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
    medForm.value.id = this.id1;
    for(let time of medForm.value.toBeTakenAt){
      time.taken = false;
    }
    this.medService.editMed(medForm.value);
    console.log(medForm.value);
  }

  

}
