import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators,FormControl } from '@angular/forms';
import { HttpServiceService } from '../../http-service.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  employeeID!: number;
formBuilder=inject(FormBuilder);
employeeForm=this.formBuilder.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  age:[0,[Validators.required]],
  phone:['',[Validators.required]],
  salary:[0,[Validators.required]],
})
httpService=inject(HttpServiceService);
router=inject(Router)
route=inject(ActivatedRoute)
toaster=inject(ToastrService);
//emailFormControl = new FormControl('', [Validators.required, Validators.email]);

ngOnInit(){
this.employeeID=this.route.snapshot.params['id'];
this.httpService.getEmployeeById(this.employeeID).subscribe(result=>{
  console.log(result);
  this.employeeForm.patchValue(result);
  //this.employeeForm.controls.email.disable();
});
}
Save(){
  //console.log(this.employeeForm.value);
  const employee :IEmployee={
name:this.employeeForm.value.name!,
email:this.employeeForm.value.email!,
age:this.employeeForm.value.age!,
phone:this.employeeForm.value.phone!,
salary:this.employeeForm.value.salary!,
  };
  if(this.employeeID){
    this.httpService.updateEmployeeById(this.employeeID,employee).subscribe(()=>{
      console.log("Success");
      this.toaster.success("Record Updated Successfully");
      this.router.navigateByUrl("/employee-list")
    });
  }
  else{
    this.httpService.createEmployee(employee).subscribe(()=>{
      console.log("Success");
      this.toaster.success("Record Created Successfully");
      this.router.navigateByUrl("/employee-list")
    });
  }

}
}
