import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public globalService: GlobalService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    this.globalService.isLoggedIn = true;
    return this.http.post<any>(environment.apiUrl + '/login', credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/register', data);
  }

  logout(): void {
    this.globalService.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
