import { Injectable } from '@angular/core';
import {AuthData} from '../models/AuthData';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private authStatus = new Subject<boolean>();
  private authStatusNormalVar = false;

  constructor(private http: HttpClient, private router: Router) { }

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
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(result => {
      console.log(result);
    });
  }

  loginUser(authData: AuthData){
    console.log('hi');
    this.http.post<{message: string, token: string}>('http://localhost:3000/api/users/login', authData).subscribe(result => {
      console.log('hi1');
      this.token = result.token;
      console.log('hi2');
      if(this.token){
        console.log('1');
        this.authStatus.next(true);
        console.log('2');
        this.authStatusNormalVar = true;
        console.log('3');
        this.router.navigate(['/']);
        console.log('4');
      }
      console.log('hi3');
    });
  }

  logout(){
    this.token = null;
    this.authStatus.next(false);
    this.authStatusNormalVar = false;
    this.router.navigate(['/login']);
  }

}
