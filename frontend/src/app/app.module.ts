import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { HomeModule } from './modules/home/home.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ReportExcelComponent } from './components/report-excel/report-excel.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    LoginModule,
    RegisterModule,
    HomeModule,
    VehiclesModule,
    ProfilesModule,
  ],
  providers: [DatePipe, ReportExcelComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
