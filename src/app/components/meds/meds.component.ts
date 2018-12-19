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

  meds: Med[] = [];
  medsFetched:boolean = false;

  constructor(private medService: MedService) { }

  ngOnInit() {
    console.log('inside cons');
    this.medService.getMeds().subscribe(medsData => {
      console.log('inside get');
      console.log(medsData.meds);
      this.meds = medsData.meds;
      console.log(this.meds);
      this.medsFetched = true;
      console.log('end1');
    });
  }

  takenClicked(time:any, med: Med){
    time.taken = true;
    this.medService.editMed(med, true);
  }

}
