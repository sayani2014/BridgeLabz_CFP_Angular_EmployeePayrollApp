import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 10;
  public employeeDetails: Employee[] = [];

  constructor(
    // private httpClient: HttpClient
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    // console.log(this.httpClient.get("http://localhost:8080/employeepayroll/getEmployeeDetails")
    //             .subscribe(data => console.log(data)));
    this.httpService.getEmployeeData().subscribe(data=> {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
      console.log(this.employeeCount);
    });
  }

  remove(id) {
    this.httpService.deleteEmployeeData(id).subscribe(data=> {
      this.employeeDetails = data.data;
      const id1 = this.employeeDetails.findIndex(e => e.empId === id);
      if(id1 !== 0) {
        this.employeeDetails.splice(id1,1);
      }
    })
  }

}
