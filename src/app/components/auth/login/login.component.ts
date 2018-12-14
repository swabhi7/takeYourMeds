import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authDataEntered: any = {
    email : '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(loginForm: any){
    console.log(loginForm.value);
  }

}
