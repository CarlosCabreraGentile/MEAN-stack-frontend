import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String = '';
  username: String = '';
  email: String = '';
  password: String = '';

  constructor(private validateService: ValidateService,
    private FlashMessagesService: FlashMessagesService,
    private AuthService: AuthService,
    private Router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.FlashMessagesService.show('Fill all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    //Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.FlashMessagesService.show('Enter Valid Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } 
    // else {
    //   this.FlashMessagesService.show('Submited', { cssClass: 'alert-success', timeout: 3000 });
    // }

    //Register User
    this.AuthService.registerUser(user)
      .subscribe(data => {
        if(data.success){
          this.FlashMessagesService.show('You are now registered', { cssClass: 'alert-success', timeout: 3000 });
          this.Router.navigate(['/login']);
        } else{
          this.FlashMessagesService.show('Error', { cssClass: 'alert-danger', timeout: 3000 });
          this.Router.navigate(['/register']);
        }
      });
  }

}
