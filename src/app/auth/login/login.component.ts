import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { TokenPayload } from '../../../models/user.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public credentials: TokenPayload = {
    email: '',
    password: ''
  }

  public response: String;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log(this.auth.isLoggedIn());
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  public login(): void {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(() => {
      console.log("Logged in!");
      this.router.navigate(['']);
      this.credentials.email = '';
      this.credentials.password = '';
    }, (err) => {
      this.response = err.error;
      this.credentials.email = '';
      this.credentials.password = '';
    });
  }

}
