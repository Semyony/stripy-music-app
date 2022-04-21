import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  constructor(private a: AuthService, private router: Router) {}

  canActivate(): boolean {
    let flag = true;
    
    if (!this.a.isAuthenticated()) {
      this.router.navigate(['/login']);
      flag = false;
    }

    return flag;
  }
}
