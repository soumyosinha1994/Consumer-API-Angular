import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpServiceService } from '../../http-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink,MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
employeeList:IEmployee[]=[];
httpService=inject(HttpServiceService);
displayedColumns: string[] = ['id', 'name', 'email', 'age','phone','salary','action'];
router=inject(Router);
toaster=inject(ToastrService);
dialog=inject(MatDialog);
ngOnInit(){
  this.getAllEmployee();

}
getAllEmployee(){
  this.httpService.getAllEmployee().subscribe(result=>{
    this.employeeList=result;
    console.log(this.employeeList);
  }) 
}
edit(id:number){
  console.log(id);
  this.router.navigateByUrl("/employee/"+id)
}

  delete(id:number,enterAnimationDuration: string, exitAnimationDuration: string){
    console.log(id);
    this.dialog.open(DialogAnimationsExampleDialog, {
    width: '400px',
    enterAnimationDuration,
    exitAnimationDuration,
    data:{
      message:id
    }
  });
  this.dialog.afterAllClosed.subscribe(()=>{
    this.getAllEmployee();
  })
  
}

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  data=inject(MAT_DIALOG_DATA);
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  httpService=inject(HttpServiceService);
  toaster=inject(ToastrService);

  delete(id:number){
    console.log(id);
    this.httpService.deleteEmployee(id).subscribe(()=>{
      console.log("deleted");
      this.toaster.error("Record deleted successfully");
    });
  }
}
