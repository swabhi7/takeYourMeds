import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: any = {
    email: '',
    phone: '',
    name: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(signupForm: any){
    console.log(signupForm.value);
  }

}
