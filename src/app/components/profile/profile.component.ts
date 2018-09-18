import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user: Object;

  constructor(private AuthService: AuthService,
    private Router: Router) { }

  ngOnInit() {
    this.AuthService.getProfile()
      .subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

}
