import { Component, OnInit } from '@angular/core';
import {AuthData} from '../../../models/AuthData';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authDataEntered: AuthData = {
    email : '',
    password: ''
  };

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSubmit(loginForm: any){
    this.authService.loginUser(loginForm.value);
  }

}
