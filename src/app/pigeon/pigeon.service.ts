import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PigeonService {
  private baseUrl = 'http://localhost:8900/api/breeder';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getHeaders(): HttpHeaders {
    const tokenString = this.getToken();

    if (tokenString) {
      try {
        const tokenObj = JSON.parse(tokenString);
        const jwtToken = tokenObj.token;

        if (jwtToken) {
          return new HttpHeaders({
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          });
        }
      } catch (e) {
        console.error('Error parsing token:', e);
        return new HttpHeaders({ 'Content-Type': 'application/json' });
      }
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  addPigeon(pigeonData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/addPigeon`, pigeonData, { headers }).pipe(
      tap(() => {
        console.log('Pigeon successfully added.');
      }),
      catchError(error => {
        console.error('Failed to add pigeon:', error);
        return throwError(() => error);
      })
    );
  }

  private getPigeonsUrl = `${this.baseUrl}/getAllPigeons`;

  getPigeons(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.getPigeonsUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching pigeons:', error);
        return throwError(() => error);
      })
    );
  }
}
