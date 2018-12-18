import { Injectable } from '@angular/core';
import {AuthData} from '../models/AuthData';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  constructor(private http: HttpClient) { }

  getToken(){
    return this.token;
  }

  createUser(authData: AuthData){
    this.http.post('http://localhost:3000/api/users/signup', authData).subscribe(result => {
      console.log(result);
    });
  }

  loginUser(authData: AuthData){
    this.http.post<{message: string, token: string}>('http://localhost:3000/api/users/login', authData).subscribe(result => {
      this.token = result.token;
    });
  }
}
