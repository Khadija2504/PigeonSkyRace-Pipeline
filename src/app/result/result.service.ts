import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private baseUrl = 'http://localhost:8900/api/breeder';
  private baseURLOrg = 'http://localhost:8900/api/organizer';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken?.token) {
          return new HttpHeaders({
            Authorization: `Bearer ${parsedToken.token}`,
            'Content-Type': 'application/json'
          });
        }
      } catch (error) {
        console.error('Invalid token format:', error);
      }
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private getResultsURL = `${this.baseUrl}/allResults`;

  getResults(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.getResultsURL, { headers }).pipe(
      catchError(error => {
        console.log(headers);
        
        console.error('Error fetching results:', error);
        return throwError(() => error);
      })
    );
  }

  exportResults(): Observable<Blob> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/exportResults`;
  
    return this.http.get(url, { headers, responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error exporting results:', error);
        return throwError(() => error);
      })
    );
  }

  uploadRaceData(competitionId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
  
    const url = `${this.baseURLOrg}/${competitionId}/uploadResults`;
    return this.http.post(url, formData, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error uploading file:', error);
        return throwError(() => error);
      })
    );
  }
}
