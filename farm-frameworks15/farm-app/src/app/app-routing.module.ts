import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { PurchaseRecordComponent } from './dashboards/admin-dashboard/record-purchase/record-purchase.component';
import { CreateBatchRecords } from './dashboards/admin-dashboard/creat-batch/create-batch.component';
import { BatchesComponent } from './batches/batches.component';
import { ViewBatchData } from './dashboards/user-dashboard/view-batchdata/view-batchdata.component';
import { ViewVaccineComponent } from './dashboards/user-dashboard/view-vaccineData/view-vaccine.component';
import { FeedsViewComponent } from './dashboards/user-dashboard/feeds-view/feeds-view.component';

const routes: Routes = [
    {path: 'feeds/:batchId', component: FeedsViewComponent},
    {path: 'vaccine/:batchId', component: ViewVaccineComponent},
    {path: 'purchase/:batchId', component: ViewBatchData},
    {path: 'all-batches', component: BatchesComponent},
    {path: 'batch-record', component: CreateBatchRecords},
    {path: 'record-purchase', component: PurchaseRecordComponent},
    {path: 'user-dashboard', component: UserDashboardComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: RegisterComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
