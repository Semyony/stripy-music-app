import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {User} from '../User';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {
    _id: '',
    userName: '',
    password: '',
  };

  public warning: string = '';
  public loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.user.userName !== '' && this.user.password !== '') {
      this.loading = true;
      this.auth.login(this.user).subscribe({
        next: (data) => {
            console.log(1);
            this.loading = false;
            localStorage.setItem('access_token', data.token);
            this.router.navigate(['/newReleases']);

          },
          error: (err) => {
            console.log(err);
            this.loading = false;
            this.warning = err.error.message;
          },
          complete: () => {
            console.log('Request complete');
          }
        });
    }
  }
}
