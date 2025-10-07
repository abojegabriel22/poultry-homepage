import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzConfigService } from 'ng-zorro-antd/core/config';


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
import { BatchesComponent } from './batches/batches.component';
import { ViewBatchData } from './dashboards/user-dashboard/view-batchdata/view-batchdata.component';
import { ViewVaccineComponent } from './dashboards/user-dashboard/view-vaccineData/view-vaccine.component';
import { FeedsViewComponent } from './dashboards/user-dashboard/feeds-view/feeds-view.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd/message';


registerLocaleData(en);

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
    FooterComponent,
    BatchesComponent,
    ViewBatchData,
    ViewVaccineComponent,
    FeedsViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzMessageModule,
    NzPopconfirmModule,
    CommonModule
  ],
  providers: [
    RegisterService,
    BatchService,
    BatchSelectionService,
    FormSelectionService,
    PurchaseService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }
    // { provide: NZ_MESSAGE_CONFIG, useValue: { nzTop: 80, nzDuration: 3000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private nzConfigService: NzConfigService) {
    // set message config globally
    this.nzConfigService.set('message', {
      nzTop: 80,        // distance from top; adjust so it's below your header
      nzDuration: 3000, // message hide after 3s
      nzMaxStack: 5     // optional, max number of message instances
    });
 }
}
