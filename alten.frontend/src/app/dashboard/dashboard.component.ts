import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import { DriverService } from '../drivers/providers/drivers.service';
import { VehicleService } from "../vehicles/providers/vehicles.service";
import { Driver } from '../drivers/models/driver';
import { Vehicle } from '../vehicles/models/vehicle';
import { MonitorService } from "./providers/monitor";
import { Signal } from "./models/signal";
import { SearchPipe } from 'app/pipes/search.pipes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DriverService, VehicleService, MonitorService]
})
export class DashboardComponent implements OnInit, OnDestroy {

  connection;

  constructor(private DriversService: DriverService, private VehicleService: VehicleService, private MonitorService: MonitorService) { }
  @Input()
  drivers: any[];
  @Input()
  searchText: string;
  @Input()
  selectedStatus: Number;
  @Input()
  driversCount: Number;
  @Input()
  vehiclesCount: Number;
  @Input()
  connectedVehiclesCount: Number;
  @Input()
  disconnectedVehiclesCount: Number;
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {
    this.connection = this.MonitorService.getSignals().subscribe((signal) => {
      var commingSingal = new Signal(signal);
      this.drivers.filter((driver) => {
        if (driver.driverId === commingSingal.driverId && driver.vehicleId === commingSingal.vehicleId) {
          driver.status = commingSingal.status === 1 ? 'Connected' : 'Disconnected';
          driver.statusValue = commingSingal.status;
          driver.time = commingSingal.timestamp
        }
      })
      let filterPipe = new SearchPipe();
      filterPipe.transform(this.drivers, { text: this.searchText, status: this.selectedStatus })
    })

    this.DriversService.getDrivers().subscribe((data) => {
      var result = []
      data.forEach((driver) => {
        driver.vehicles.forEach((vehicle) => {
          let obj = {
            driverId: driver._id,
            vehicleId: vehicle._id,
            name: driver.name,
            address: driver.address,
            city: driver.city,
            vin: vehicle.vin,
            regNo: vehicle.regNo
          }
          result.push(obj);
        })
      })
      this.drivers = result;
      this.MonitorService.getVehcilesStatus().subscribe((signals) => {
        signals.forEach((signal) => {
         
          this.drivers.filter((driver) => {
            if (driver.driverId === signal.driverId && driver.vehicleId === signal.vehicleId) {
              driver.status = signal.status === 1 ? 'Connected' : 'Disconnected';
              driver.statusValue = signal.status;
              driver.time = signal.timestamp
            }
          })
         
        })
      })
    })

    this.DriversService.getDriversCount().subscribe(data => this.driversCount = data)
    this.VehicleService.getVehilcesCount().subscribe(data => this.vehiclesCount = data)

    this.VehicleService.getConnectedVehilcesCount().subscribe(data => this.connectedVehiclesCount = data)
    this.VehicleService.getDisconnectedVehilcesCount().subscribe(data => this.disconnectedVehiclesCount = data)
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
