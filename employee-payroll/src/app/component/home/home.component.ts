import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    private httpService: HttpService,
    private router: Router,
  ) {}

  /**
   * When the getEmployeeData() is hit, all employee details is populated from the database to the HOME page.
   */
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data=> {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
      console.log(this.employeeCount);
    });
  }

  /**
   * When the remove() is hit, the employee gets deleted from the database and also the details is removed from the HOME page.
   * Thus, a refreshed home page is rendered.
   * 
   * @param id remove() is invoked for a particular employee id.
   */
  remove(id: number) {
    this.httpService.deleteEmployeeData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit();      
    });
  }

  
  update(employee : Employee) {
    console.log(employee);
    this.router.navigateByUrl('/edit/' +employee.empId);
    // this.employeeDetails.entries();
    // this.httpService.updateEmployeeData(id, this.employeeDetails).subscribe(data=> {
    //   console.log(data);      
    // });
  }
}
