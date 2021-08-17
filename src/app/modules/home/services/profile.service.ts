import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GRAPH_ENDPOINT } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl: string = GRAPH_ENDPOINT;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any>{
    return this.http.get(this.baseUrl);
  }
}
