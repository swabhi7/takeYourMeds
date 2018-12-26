import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  email: string;
  phone: string;
  name: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.getUser().subscribe(result => {
      this.email = result.user.email;
      this.phone = result.user.phone;
      this.name = result.user.name;
    });

  }

}
