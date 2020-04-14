import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  public isLogged: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public logout(): void {
    this.auth.logout();
    this.isLogged = false;
  }

}
