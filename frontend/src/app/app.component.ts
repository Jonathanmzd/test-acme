import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService, private router: Router, public globalService: GlobalService) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
