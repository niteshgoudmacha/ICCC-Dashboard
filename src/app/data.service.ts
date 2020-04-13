import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:3000'
  constructor(private http: HttpClient) {
    if(!isDevMode()) {
      this.url = '';
    }
  }

  uploadData(body) {
    console.log('data service = ', body);
    return this.http.post(this.url + '/api/user/update', body, {
      observe: 'body'
    });
  }

  getProfile(handle) {
    console.log(handle);
    return this.http.get(this.url + '/api/user/profile', {
      observe: 'body',
      params: new HttpParams().set('handle', handle)
    });
  }

  getUsers() {
    return this.http.get(this.url + '/api/user/getAllUsers');
  }
}
