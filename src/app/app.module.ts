import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoBasicCarComponent } from './feature/admin/components/info-basic-car/info-basic-car.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
