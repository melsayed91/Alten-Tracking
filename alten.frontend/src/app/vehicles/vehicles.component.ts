import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from './providers/vehicles.service';
import { Vehicle } from './models/vehicle';
@Component({
  selector: 'app-table-list',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [VehicleService]
})
export class VehiclesComponent implements OnInit {

  constructor(private VehicleService: VehicleService) { }
  @Input()
  vehicles: Vehicle[];
  ngOnInit() {
    this.VehicleService.getVehilces().subscribe(data => this.vehicles = data)
  }

}
