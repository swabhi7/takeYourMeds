import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedsComponent} from './components/meds/meds.component';
import {MyProfileComponent} from './components/my-profile/my-profile.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MyMedsDetailsComponent} from './components/my-meds-details/my-meds-details.component';
import {AddMedsComponent} from './components/add-meds/add-meds.component';
import {EditMedComponent} from './components/edit-med/edit-med.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path: '', component: MedsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
  {path: 'meds/details', component: MyMedsDetailsComponent, canActivate: [AuthGuard]},
  {path: 'meds/add', component: AddMedsComponent, canActivate: [AuthGuard]},
  {path: 'meds/edit/:id', component: EditMedComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
