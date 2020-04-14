import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User, TokenPayload, TokenResponse } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private token: string;
  private tokenName: string = 'access_token';
  private apiUrl: string = `http://localhost:8000`;

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(this.tokenName);
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem(this.tokenName)
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      console.log(`${this.apiUrl}/api/${type}`, user);
      base = this.http.post(`${this.apiUrl}/api/${type}`, user);
    } else {
      base = this.http.get(`${this.apiUrl}/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    console.log(`${this.apiUrl}/api/register`, user)
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

}
