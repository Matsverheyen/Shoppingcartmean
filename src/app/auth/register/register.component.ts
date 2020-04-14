import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { TokenPayload } from '../../../models/user.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
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

  public register(): void {
    this.auth.register(this.credentials).subscribe(() => {
      console.log('ts')
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
    })
  }

}
