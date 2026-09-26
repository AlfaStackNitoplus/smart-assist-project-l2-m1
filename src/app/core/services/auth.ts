import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private http = inject(HttpClient);

  private apiBaseUrl = 'https://smart-assist-monolith-api-f4gqd3ghfrhwbmfn.centralindia-01.azurewebsites.net';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/api/v1/authenticate`, request);
  }
}
