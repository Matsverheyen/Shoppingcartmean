import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { TokenPayload } from '../../../models/user.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials: TokenPayload = {
    email: '',
    password: ''
  }

  public response: String;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/cart']);
    }
  }

  public login(): void {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigate(['/cart']);
      this.credentials.email = '';
      this.credentials.password = '';
    }, (err) => {
      this.response = err.error;
      this.credentials.email = '';
      this.credentials.password = '';
    });
  }

}
