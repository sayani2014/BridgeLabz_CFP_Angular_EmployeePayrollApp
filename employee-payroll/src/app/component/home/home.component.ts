import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 10;

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.httpClient.get("http://localhost:8080/employeepayroll/getEmployeeDetails")
                .subscribe(data => console.log(data)));
  }

}
