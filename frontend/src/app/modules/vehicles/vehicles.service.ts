import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from '../../../environments/environment';
import { Vehicle } from 'src/app/interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
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
      return this.http.get<Vehicle>(environment.apiUrl + `/vehicles`, { headers });
    } else {
      return new Observable<any>((observer) => {
        observer.error('No existe Token');
        observer.complete();
      });
    }
  }

  createVehicle(vehicleData: Vehicle): Observable<any> {
    const headers = this.getTokenHeaders();
    if (headers !== null) {
      return this.http.post<Vehicle>(`${environment.apiUrl}/vehicles`, vehicleData, { headers })
        .pipe(
          catchError(error => {
            console.error('Error Creando:', error);
            return throwError('Algo Salio Mal.');
          })
        );
    } else {
      return new Observable<any>((observer) => {
        observer.error('No existe Token');
        observer.complete();
      });
    }
  }
}
