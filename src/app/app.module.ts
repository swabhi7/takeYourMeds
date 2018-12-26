import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MedService} from './services/med.service';

import { AppComponent } from './app.component';
import { MedsComponent } from './components/meds/meds.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyMedsDetailsComponent } from './components/my-meds-details/my-meds-details.component';
import { AddMedsComponent } from './components/add-meds/add-meds.component';
import { EditMedComponent } from './components/edit-med/edit-med.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    MedsComponent,
    NavbarComponent,
    MyProfileComponent,
    PageNotFoundComponent,
    MyMedsDetailsComponent,
    AddMedsComponent,
    EditMedComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    MedService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
