import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) {}
  
  getEmployeeData(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/employeepayroll/getEmployeeDetails");
  }

  postEmployeeData(data): Observable<any> {
    return this.httpClient.post("http://localhost:8080/employeepayroll/addEmployeeDetails", data);
  }

  deleteEmployeeData(id): Observable<any> {
    return this.httpClient.delete("http://localhost:8080/employeepayroll/deleteEmployeeDetails?id=${id}", id);
  }
}
