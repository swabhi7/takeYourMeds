import { Component, OnInit, ViewChild } from '@angular/core';
import {Med} from '../../models/Med'; 
import {MedService} from '../../services/med.service';

@Component({
  selector: 'app-meds',
  templateUrl: './meds.component.html',
  styleUrls: ['./meds.component.css']
})
export class MedsComponent implements OnInit {

  @ViewChild('medForm') form: any;

  med: Med = {
    _id: null,
    name: '',
    purpose: '',
    composition: '',
    toBeTakenAt: [],
    myReview: ''
  };
  meds: Med[] = [];
  hoursArr: any[] = [];
  minsArr: any[] = [];

  currentTime:Date;
  currentHour:number;
  currentMin:number;
  hourRem:number;
  minRem:number;
  timeup:boolean;
  calculated:boolean = false;
  medsFetched:boolean = false;


  constructor(private medService: MedService) { }

  ngOnInit() {

    for(let i = 1; i <= 12; i++){
      if(i < 10){
        this.hoursArr.push("0" + i);
      }
      else{
        this.hoursArr.push(i);
      }
      
    }

    this.minsArr = ['00', 15, 30, 45];
    
    this.medService.getMeds().subscribe(medsData => {
      console.log('123');
      this.meds = medsData.meds;
      this.medsFetched = true;
      console.log(this.meds);
      console.log('456');

      this.currentTime = new Date();
      this.currentHour = this.currentTime.getHours();
      this.currentMin = this.currentTime.getMinutes();

      for(let med of this.meds){
        for(let time of med.toBeTakenAt){
          //console.log(this.calTimeRem(time));
          this.calTimeRem(time);
          //time.taken = false;
          console.log(time);
          //time.hourRem = 10;
          
          console.log('Timeup - '+ time.timeup);
        }
      }

      console.log(this.meds);

      this.calculated = true;
      console.log(this.calculated);
    });

    
    
  }

  calTimeRem(time:any):any{
    
    let totalMin:number, totalCurrentMin:number = this.currentHour * 60 + this.currentMin;
    if(time.amorpm == 'am'){
      if(time.hh == 12){
        totalMin = time.mm;
      }
      else{
        totalMin = time.hh * 60 + time.mm;
      } 
    }
    if(time.amorpm == 'pm'){
      if(time.hh == 12){
        totalMin = time.mm;
      }
      else{
        console.log('hh ' + time.hh + ' mm ' + time.mm);
        totalMin = ((time.hh + 12) * 60) + (time.mm);
        console.log('tm ' + totalMin);
      }     
    }
    if(totalMin - totalCurrentMin <= 0){
      time.timeup = true;
    }
    else{
      console.log('totalmin ' + totalMin + ' total current min ' + totalCurrentMin);
      console.log(this.currentHour);
      time.timeup = false;
      let minRem = totalMin - totalCurrentMin;
      time.hourRem = Math.floor(minRem / 60);
      time.minRem = minRem % 60;
    }
    return time;
  }

  onSubmit(medForm: any){
    //console.log(medForm.value);
    //console.log(medForm.valid);
    //medForm.value.toBeTakenAt.hh = 10;
    //medForm.value.toBeTakenAt.mm = 15;
    //this.meds.unshift(medForm.value);
    this.medService.addMed(medForm.value);
  }

  addUser(){
    //this.med.toBeTakenAt.hh = 10;
    //this.med.toBeTakenAt.mm = 15;
    this.meds.unshift(this.med);
  }

  takenClicked(time:any, med: Med){
    console.log(this.meds);
    time.taken = true;
    this.medService.editMed(med);
    console.log(this.meds);
  }

}
