import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private AuthService: AuthService,
    private FlashMessagesService: FlashMessagesService,
    private Router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.AuthService.authenticateUser(user)
      .subscribe(data => {
        if (data.success) {
          this.AuthService.storeUserData(data.token, data.user);
          this.FlashMessagesService.show('Logged In', { cssClass: 'alert-success', timeout: 4000 });
          this.Router.navigate(['/dashboard']);
        } else {
          this.FlashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 4000 });
          this.Router.navigate(['/login']);
        }
      });
  }
}
