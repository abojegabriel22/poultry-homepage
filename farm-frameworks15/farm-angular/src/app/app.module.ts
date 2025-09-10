import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditPageContentComponent } from './edit-page-content/edit-page-content.component';
import { MainContentComponent } from './main-content/main-content.component';
import { OffcanvaComponent } from './offcanva/offcanva.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditPageContentComponent,
    MainContentComponent,
    OffcanvaComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
