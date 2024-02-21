import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getTokenHeaders(): HttpHeaders | null {
    const token = localStorage.getItem('token');

    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      return null;
    }
  }

  getUserIdFromToken(): number | null {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub;
    } else {
      return null;
    }
  }

  getAll(): Observable<any> {
    const headers = this.getTokenHeaders();
    if (headers !== null) {
      return this.http.get<any>(environment.apiUrl + `/profiles`, { headers });
    } else {
      return new Observable<any>((observer) => {
        observer.error('No existe Token');
        observer.complete();
      });
    }
  }

  getUsersByRole(role: string): Observable<any[]> {
    const headers = this.getTokenHeaders();
    if (headers !== null) {
      return this.http.get<any>(environment.apiUrl + `/profiles`, { headers }).pipe(
        map((response) => {
          return Object.values(response.data).filter(user => this.hasRole(user, role));
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
    } else {
      return new Observable<any>((observer) => {
        observer.error('No existe Token');
        observer.complete();
      });
    }
  }

  private hasRole(user: any, role: string): boolean {
    return typeof user === 'object' && user !== null && 'role' in user && user.role === role;
  }

  newProfile(profileData: any): Observable<any> {
    const headers = this.getTokenHeaders();
    if (headers !== null) {
      return this.http.post<any>(`${environment.apiUrl}/profiles`, profileData, { headers });
    } else {
      return new Observable<any>((observer) => {
        observer.error('No existe Token');
        observer.complete();
      });
    }
  }
}
