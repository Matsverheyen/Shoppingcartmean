import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.auth.isLoggedIn());
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
    console.log("Logged out!");
  }

}
