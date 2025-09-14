import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { PurchaseRecordComponent } from './dashboards/admin-dashboard/record-purchase/record-purchase.component';
import { CreateBatchRecords } from './dashboards/admin-dashboard/creat-batch/create-batch.component';
// import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '', component: PurchaseComponent},
    {path: 'batch-record', component: CreateBatchRecords},
    {path: 'record-purchase', component: PurchaseRecordComponent},
    {path: 'user-dashboard', component: UserDashboardComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
