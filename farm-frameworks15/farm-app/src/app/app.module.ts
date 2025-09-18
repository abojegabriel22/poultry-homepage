import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidePanelComponent } from './side-panel-lg/side-panel.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RegisterService } from './services/register.service';
import { AdminDashboardComponent } from './dashboards/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboards/user-dashboard/user-dashboard.component';
import { PurchaseRecordComponent } from './dashboards/admin-dashboard/record-purchase/record-purchase.component';
import { CreateBatchRecords } from './dashboards/admin-dashboard/creat-batch/create-batch.component';
import { BatchService } from './services/batch.service';
import { BatchSelectionService } from './services/batch-selection.service';
import { FormSelectionService } from './services/form-selection.service';
import { PurchaseService } from './services/purchase.service';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidePanelComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    PurchaseRecordComponent,
    CreateBatchRecords,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    RegisterService,
    BatchService,
    BatchSelectionService,
    FormSelectionService,
    PurchaseService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
