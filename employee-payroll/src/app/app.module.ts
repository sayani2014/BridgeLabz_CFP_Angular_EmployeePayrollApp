import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './component/add/add.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './component/add-form/add-form.component';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';
import { DateFormatPipePipe } from './pipe/date-format-pipe.pipe';
import { DialogBoxComponent } from './component/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    HeaderComponent,
    HomeComponent,
    AddFormComponent,
    DateFormatPipePipe,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
