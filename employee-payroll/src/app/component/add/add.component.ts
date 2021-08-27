import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /**
   * Creating object for the Employee Bean class.
   */
    employeeData = new Employee();

    constructor( 
      private httpService: HttpService,
      private router: Router
    ) {}

  /**
   * Purpose : Method in mat-slider to label the values in the slider.
   *
   * @param value Math.round() returns the value rounded to the nearest integer
   * @returns 
   */
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  ngOnInit(): void {
  }

  /**
   * Method to submit the form, i.e., add employee data in the database.
   * Once the method is invoked, the post method is hit in the HTTP server and the home page is rendered.
   */
  submit() {
    this.httpService.postEmployeeData(this.employeeData).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl("/home");
    });
  }
}


