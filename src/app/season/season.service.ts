import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private baseUrl = 'http://localhost:8900/api/organizer';
  
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

    addSeason(seasonDetails: any) : Observable<any> {
      const headers = this.getHeaders();
      return this.http.post(`${this.baseUrl}/addSaison`, seasonDetails, {headers}).pipe(
      tap(() => {
        console.log('Season successfully added');
      }),
      catchError(error => {
        console.error('Failed to add season:', error);
        return throwError(() => error);
      })
    );
    }
}
