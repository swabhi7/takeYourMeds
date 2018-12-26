import { Injectable } from '@angular/core';
import {AuthData} from '../models/AuthData';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatus = new Subject<boolean>();
  private authStatusNormalVar = false;

  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private flashMessage: FlashMessagesService) { }

  getToken(){
    return this.token;
  }

  getAuthStatus(){
    return this.authStatus.asObservable();
  }

  getAuthStatusNormalVar() {
    return this.authStatusNormalVar;
  }

  createUser(authData: AuthData){
    this.http.post(this.backendUrl + '/users/signup', authData).subscribe(result => {
      //console.log(result);
      this.flashMessage.show('Signed up successfully! Now Login.', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.router.navigate(['/login']);
    });
  }

  loginUser(authData: AuthData){
    this.http.post<{message: string, token: string}>(this.backendUrl + '/users/login', authData).subscribe(result => {
      this.token = result.token;
      if(this.token){
        this.authStatus.next(true);
        this.authStatusNormalVar = true;
        this.saveAuthDataInLocalStorage(this.token);
        this.flashMessage.show('Logged In successfully!', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.router.navigate(['/']);
      }
    });
  }

  logout(){
    this.token = null;
    this.authStatus.next(false);
    this.authStatusNormalVar = false;
    this.clearAuthDataInLocalStorage();
    this.flashMessage.show('Logged Out successfully!', {
      cssClass: 'alert-success',
      timeout: 5000
    });
    this.router.navigate(['/login']);
  }

  getUser(): Observable<any>{
    return this.http.get(this.backendUrl + '/user');
  }

  saveAuthDataInLocalStorage(token: string){
    localStorage.setItem('token', token);
  }

  clearAuthDataInLocalStorage(){
    localStorage.removeItem('token');
  }

  autoAuthIfDataInLocalStorage(){
    console.log('autoauth called');
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.authStatus.next(true);
      this.authStatusNormalVar = true;
    }
  }

}
