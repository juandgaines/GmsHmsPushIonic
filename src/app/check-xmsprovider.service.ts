import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare var cordova: any;
@Injectable({
  providedIn: 'root'
})
export class CheckXMSProviderService {

  isGms = new Subject<string>();
  isHms = new Subject<string>();

  constructor() { }

  isHmsAvailable() {
    let isAvailable
    cordova.plugins.CordovaHMSGMSCheckPlugin.isHmsAvailable("Get Hms available", _res => {
      console.log("HMS?,", _res);
      this.isHms.next(_res.toString());
    }, (_error: string) => {
      isAvailable = 'false'
      console.log("Error getting HMS?,", isAvailable)
      this.isHms.next(isAvailable)
    });
  }

  isGmsAvailable() {
    let isAvailable
    cordova.plugins.CordovaHMSGMSCheckPlugin.isGmsAvailable("Get Gms available", _res => {
      console.log("GMS?,", _res)
      this.isGms.next(_res.toString());
      return _res
    }, (_error: string) => {
      isAvailable = 'false'
      console.log("Error getting GMS?,", isAvailable)
      this.isGms.next(isAvailable);
    });
  }


}
