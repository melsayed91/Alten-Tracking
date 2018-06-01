import { Component, OnInit, Input } from '@angular/core';
import { DriverService } from './providers/drivers.service';
import { Driver } from './models/driver';
@Component({
  selector: 'app-user-profile',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
  providers: [DriverService]
})
export class DriversComponent implements OnInit {

  constructor(private DriversService: DriverService) {

  }
  @Input()
  drivers: Driver[];
  
  ngOnInit() {
    this.DriversService.getDrivers().subscribe(data => this.drivers = data)
  }
}
