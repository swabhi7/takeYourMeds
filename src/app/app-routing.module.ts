import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedsComponent} from './components/meds/meds.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MyMedsDetailsComponent} from './components/my-meds-details/my-meds-details.component';
import {AddMedsComponent} from './components/add-meds/add-meds.component';
import {EditMedComponent} from './components/edit-med/edit-med.component';

const routes: Routes = [
  {path: '', component: MedsComponent},
  {path: 'profile', component: MyProfileComponent},
  {path: 'meds/details', component: MyMedsDetailsComponent},
  {path: 'meds/add', component: AddMedsComponent},
  {path: 'meds/edit/:id', component: EditMedComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
