import { Routes } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { LoginComponent } from './component/login/login.component';
import { ConsumerFieldsComponent } from './component/consumer-fields/consumer-fields.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },
    {
        path:"employee-list",
        component:EmployeeListComponent,
    },
    {
        path:"create-employee",
        component:EmployeeFormComponent,
    },
    {
        path:"employee-list/create-employee",
        component:EmployeeFormComponent,
    },
    {
        path:"employee/:id",
        component:EmployeeFormComponent,
    },
    {
        path:"login",
        component:LoginComponent,
    },
    {
        path:"consumer-fields",
        component:ConsumerFieldsComponent,
    },

];
