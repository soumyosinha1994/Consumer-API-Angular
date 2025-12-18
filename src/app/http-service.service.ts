import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
 apiURL="https://localhost:7197/";
http=inject(HttpClient);
  constructor() { }
  getAllEmployee(){
   return this.http.get<IEmployee[]>(this.apiURL+"api/Employee/GetAllEmployee");
  }
  createEmployee(employee:IEmployee){
return this.http.post(this.apiURL+"api/Employee/AddEmployee",employee)
  }
  getEmployeeById(employeeId:number){
    return this.http.get<IEmployee>(this.apiURL+"api/Employee/GetEmployeeById?id="+employeeId);
   }
   updateEmployeeById(employeeId:number,employee:IEmployee){
    return this.http.put<IEmployee>(this.apiURL+"api/Employee/UpdateEmployee?id="+employeeId,employee);
   }
   deleteEmployee(employeeId:number){
    return this.http.delete(this.apiURL+"api/Employee/DeleteEmployee?id="+employeeId);
   }
   getAuthToken(url:string,clientId:string,clientSecret:string){
    return this.http.post<{ authToken: string }>(this.apiURL + 'api/AuthToken/GetAuthToken', {
      url: url,
      clientId: clientId,
      clientSecret: clientSecret
    });
   }

   getConsumerFields(contentId: string) {
    const token = localStorage.getItem('authToken');
    console.log("Token in service:", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}api/Consumer/${contentId}/fields`,
      { headers }
    );
  }

}
