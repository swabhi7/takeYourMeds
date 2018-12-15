import { Injectable } from '@angular/core';
import {AuthData} from '../models/AuthData';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(authData: AuthData){
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(result => {
      console.log(result);
    });
  }

  loginUser(authData: AuthData){
    this.http.post('http://localhost:3000/api/users/login', authData).subscribe(result => {
      console.log(result);
    });
  }
}
