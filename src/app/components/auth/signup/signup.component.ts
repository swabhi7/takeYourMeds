import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {AuthData} from '../../../models/AuthData';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: AuthData = {
    email: '',
    phone: '',
    name: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(signupForm: any){
    this.authService.createUser(signupForm.value);
  }

}
