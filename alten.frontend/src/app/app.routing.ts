import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


const routes: Routes =[
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'drivers',   component: DriversComponent },
    { path: 'vehicles',     component: VehiclesComponent },
    { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
