import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService implements HttpInterceptor {
  // Initialization

  constructor(private a: AuthService) {}

  // Methods

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('spotify.com')) {
      return next.handle(request);
    }

    console.log(this.a.getToken());
    const req = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.a.getToken()}`),
    });
    return next.handle(req);
  }
}
