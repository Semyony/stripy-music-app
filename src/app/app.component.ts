import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  search: any;
  token: any;

  constructor(private r: Router, private a: AuthService){}

  handleSearch(): void {
    this.r.navigate(['/search'], {
      queryParams: { q: this.search },
    });
  }
  
  ngOnInit(): void {
    this.search = '';
    this.r.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.a.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.r.navigate(['login']);
  }
}
