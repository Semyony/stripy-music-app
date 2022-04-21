import { AuthService } from '../auth.service';
import {RegisterUser} from '../RegisterUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  public registerUser: RegisterUser = {userName: "", password: "", password2: ""};

  public warning: string = "";
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerUser.password !== "" && this.registerUser.password2 !== "" && this.registerUser.userName !== "") {
      this.warning = 'Some fields are blank';
    }

    if (this.registerUser.password !== this.registerUser.password2) {
      this.warning = 'Passwords must match';
    }
    if (
      this.registerUser.userName !== '' &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;
      this.authService.register(this.registerUser).subscribe(
        () => {
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
