import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    employeeData = new Employee();

    constructor( 
      private httpService: HttpService
    ) {

    }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  ngOnInit(): void {
    // this.httpService.postEmployeeData().
    
  }

  submit() {
    this.httpService.postEmployeeData(this.employeeData).subscribe(res=>{
      console.log(res);
    });
    // console.log(this.employeeData);
  }
}


