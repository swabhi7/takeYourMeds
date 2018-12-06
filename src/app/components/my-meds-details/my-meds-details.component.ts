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
    this.medService.getMeds().subscribe(medsData => {
      this.meds = medsData.meds;
    });
  }

  deleteClicked(id:any){
    //update local meds array after deleting
    let index:number;
    for(let med1 of this.meds){
      if(med1._id == id){
        index = this.meds.indexOf(med1);
      }
    }
    this.meds.splice(index, 1);
    //making the call to service to delete
    this.medService.deleteMed(id);
  }

}
