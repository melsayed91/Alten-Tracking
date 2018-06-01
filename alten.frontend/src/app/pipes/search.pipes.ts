import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'driverfilter' })
export class SearchPipe implements PipeTransform {
    transform(drivers: any, query: any): any {
        if ((query.text == null || query.text.trim() == '') && (query.status == null || query.status.trim() == '')) return drivers;
        if (query.text && !query.status)
            return drivers.filter(function (driver) {
                return driver.name.toLowerCase().indexOf(query.text.toLowerCase()) > -1;
            })
        if (!query.text && query.status)
            return drivers.filter(function (driver) {
                return driver.statusValue === Number(query.status);
            })
        if (query.text && query.status)
            return drivers.filter(function (driver) {
                return driver.name.toLowerCase().indexOf(query.text.toLowerCase()) > -1;
            }).filter(function (driver) {
                return driver.statusValue === Number(query.status);
            })
    }
}