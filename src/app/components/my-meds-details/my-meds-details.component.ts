import { Component, OnInit } from '@angular/core';
import {Med} from '../../models/Med';
import {MedService} from '../../services/med.service';

@Component({
  selector: 'app-my-meds-details',
  templateUrl: './my-meds-details.component.html',
  styleUrls: ['./my-meds-details.component.css']
})
export class MyMedsDetailsComponent implements OnInit {

  meds: Med[] = [];

  constructor(private medService: MedService) { }

  ngOnInit() {
    this.medService.getMeds().then(medsData => {
      this.meds = medsData.meds;
    });
  }

  deleteClicked(id:string){
    this.medService.deleteMed(id);
  }

}
