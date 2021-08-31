import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  employeeFormGroup: FormGroup;
  public employee: Employee = new Employee();
  message: string;
  
  departments: Array<any> = [
    {
      name:"HR",
      value:"HR", 
      checked:false
    },
    {
      name:"Sales",
      value:"Sales", 
      checked:false
    },
    {
      name:"Finance",
      value:"Finance", 
      checked:false
    },
    {
      name:"Engineer",
      value:"Engineer", 
      checked:false
    },
    {
      name:"Other",
      value:"Other", 
      checked:false
    },
  ]

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog
      ) {

    /**
     * Added validations to the employee payroll form data.
     */
    this.employeeFormGroup = this.fb.group({
      empName: new FormControl('', [ Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
      profilePic: new FormControl('', Validators.required),
      empGender: new FormControl('', Validators.required),
      department: this.fb.array([], Validators.required),
      empSalary: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
    })
  }

  /**
   * Since department is an array type variable, so onCheckboxChange() is called.
   * It stores the checked value in the form of array.
   * When any checkbox is clicked, the value is pushed in the department variable;
   * if unchecked, the value is popped out from the department variable.
   * 
   * @param e event which captures the department value when checked and unchecked.
   *          According to the event value, the push and remove operation takes place in the department variable. 
   */
  onCheckboxChange(e) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
  
    if (e.checked) {
      department.push(new FormControl((event.target as HTMLInputElement).value));
    } else {
      let i: number = 0;
      department.controls.forEach((item: FormControl) => {
        if (item.value == (event.target as HTMLInputElement).value) {
          department.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  /**
   * The below method is also a valid method. Either one can be used.
   */
  // onCheckboxChange(event: MatCheckboxChange) {
  //   const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

  //   if (event.checked) {
  //     department.push(new FormControl(event.source.value));
  //   } else {
  //     const index = department.controls.findIndex(x => x.value === event.source.value);
  //     department.removeAt(index);
  //   }
  // }

  /**
   * Method to capture the salary value from the slider.
   * The value in the formatLabel() is set at an interval of 1000.
   * The event variable basically provides the value of the slider (to which value it is moved to)
   * and it is stored in the salaryOutput.
   */
  salaryOutput: number = 400000;
  updateSetting(event) {
    this.salaryOutput = event.value;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  /**
   * Method to set the employee object value of a particular employee id in the Employee FormBuilder.
   * This method is called when the update() is hit in the HOME page.
   */
  ngOnInit(): void { 
    if(this.route.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if(Object.keys(employee).length !== 0) {
          this.employeeFormGroup.patchValue({
            empName:employee.empName,
            profilePic:employee.profilePic,
            empGender:employee.empGender,
            empSalary:employee.empSalary,
            startDate:employee.startDate,
            note:employee.note
          });
          const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
          employee.department.forEach(departmentElements => {
            for ( let index = 0; index < this.departments.length; index++ ) {
              if(this.departments[index].name == departmentElements) {
                this.departments[index].checked = true;
                department.push(new FormControl(this.departments[index].value));
              }
            }
          });
          // this.employeeFormGroup.get('empName')?.setValue(employee.empName);
          // this.employeeFormGroup.get('profilePic')?.setValue(employee.profilePic);
          // this.employeeFormGroup.get('empGender')?.setValue(employee.empGender);
          // this.employeeFormGroup.get('empSalary')?.setValue(employee.empSalary);
          // this.employeeFormGroup.get('startDate')?.setValue(employee.startDate);
          // this.employeeFormGroup.get('note')?.setValue(employee.note);
        }   
      });
    }
  }

  /**
   * Ability to add dialog box for displaying message.
   * The setTimeout() sets a timer for the dialog box to remain visible to the user.
   * The this.dialog.open() goes to the DialogBoxComponent along with the dialogConfig object. The object contains the message and other properties if mentioned.
   * 
   * @param data message to be displayed to the user.
   */
  openDialog(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    setTimeout(() => {
      dialogRef.close();
    }, 1500);
  }

  /**
   * onSubmit() is common for ERROR Validation, PUT and POST HTTP Method.
   * Initially the form is validated whether all data is inputted.
   * The name, date and text box displays error using <mat-error> and the profilePic, gender, department and salary gives a dialog window.
   * If the contains any id, then the PUT method is called; else the POST method is called.
   * Once either of the methods get executed, the respond data is consoled on screen to verify its status.
   * Finally the page gets redirected to the home page and a message is displayed to the user.
   */
  onSubmit() { 
    var dateString = this.employeeFormGroup.get('startDate').value;
    var myDate = new Date(dateString);
    var today = new Date();
    if ( myDate > today ) { 
      this.message = "StartDate should not be future date. It should be past or today's date.";
      this.openDialog(this.message);
    }
    if(this.employeeFormGroup.invalid) { 
      if(this.employeeFormGroup.get('department').value.length == 0) {
        this.message = "Department is empty";
        this.openDialog(this.message);
      }
      else {
        this.message = "1. Profile Pic required" + "\n" +
                       "2. Gender required" + "\n" +
                       "3. Min Wage should be more than 10000";
        this.openDialog(this.message);
      }
    }
    else {
      this.employee = this.employeeFormGroup.value;
      if(this.route.snapshot.params['id'] != undefined) {
        this.httpService.updateEmployeeData(this.route.snapshot.params['id'], this.employee).subscribe(data=>{
          console.log(data);
          this.message = data.message;
          this.openDialog(this.message);
          this.router.navigateByUrl("/home"); 
        });
      }
      else { 
        this.httpService.postEmployeeData(this.employee).subscribe(res=>{
          console.log(res); 
          this.message = res.message; 
          this.openDialog(this.message);
          this.router.navigateByUrl("/home"); 
        });
      }
    }
  }

  /**
   * Method to validate empName and note
   * 
   * @param controlName value add in the input tag.
   * @param errorName error value displayed from the mat-error tag.
   * @returns the error value.
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }
}
