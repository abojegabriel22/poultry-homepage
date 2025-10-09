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
import { ProfileGuardService } from './guards/profileGuard.service';
import { UserGuardService } from './guards/userGuard.service';
import { VerifyMailComponent } from './authentication/verifymail/verify.component';

const routes: Routes = [
    {path: 'feeds/:batchId', component: FeedsViewComponent},
    {path: 'vaccine/:batchId', component: ViewVaccineComponent},
    {path: 'purchase/:batchId', component: ViewBatchData},
    {path: 'all-batches', component: BatchesComponent},
    {path: 'batch-record', component: CreateBatchRecords},
    {path: 'record-purchase', component: PurchaseRecordComponent},
    {path: 'user-dashboard', canActivate:[ProfileGuardService], component: UserDashboardComponent},
    {path: 'admin-dashboard', canActivate:[ProfileGuardService, UserGuardService], component: AdminDashboardComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'verify', component: VerifyMailComponent},
    {path: 'login', component: LoginComponent},
    {path: '', component: RegisterComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  providers: [
    ProfileGuardService,
    UserGuardService
  ]
})
export class AppRoutingModule { }
