import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private AuthService: AuthService,
    private FlashMessagesService: FlashMessagesService,
    private Router: Router) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.AuthService.logout();
    this.FlashMessagesService.show('Logged Out', { cssClass: 'alert-success', timeout: 4000 });
    this.Router.navigate(['/login']);
    return false;
  }

}
