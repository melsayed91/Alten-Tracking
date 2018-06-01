import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { SearchPipe } from "./pipes/search.pipes";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DriversComponent,
    VehiclesComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
