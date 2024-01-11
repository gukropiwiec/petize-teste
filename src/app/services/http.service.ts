import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  private apiURI = 'https://abitus-api.pjc.mt.gov.br/v1/pessoas'

  constructor(private httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get(endpoint: string): Observable<T> {
    const url = `${this.apiURI}/${endpoint}`;
    return this.httpClient.get<T>(url, this.httpOptions);
  }

  getOne(endpoint: string, serialNumber: string): Observable<T> {
    const url = `${this.apiURI}/${endpoint}/${serialNumber}`;
    return this.httpClient.get<T>(url, this.httpOptions);
  }
}
