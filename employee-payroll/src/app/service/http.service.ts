import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL: string = "http://localhost:8080/employeepayroll/";

  constructor(
    private httpClient: HttpClient
  ) {}
  
  /**
   * Purpose : GET request method to hit the HTTP server.
   * @returns the get request response.
   */

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "getEmployeeDetails");
  }

  /**
   * Purpose : POST request method to hit the HTTP server.
   * @param data employee details to be stored in the database.
   * @returns the post request response.
   */

  postEmployeeData(data): Observable<any> {
    return this.httpClient.post(this.baseURL + "addEmployeeDetails", data);
  }

  /**
   * Purpose : DELETE request method to hit the HTTP server.
   * @param id employee_id for which the delete action needs to be taken.
   * @returns the delete request response.
   */

  deleteEmployeeData(id): Observable<any> {
    return this.httpClient.delete(this.baseURL + "deleteEmployeeDetails?id=" +id);
  }

  /**
   * Purpose : PUT request method to hit the HTTP server.
   * @param id employee_id for which the update action needs to be taken.
   * @param data employee details to be updated in the database.
   * @returns the put request response.
   */

  updateEmployeeData(id, data): Observable<any> {
    return this.httpClient.put(this.baseURL + "updateEmployeeDetails?id=" +id, data);
  }
}
