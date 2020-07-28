import { Component, Injector } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, Subject } from 'rxjs';
import { HmsServiceService } from '../hms-service.service';
import { PushNotification } from "../push_notification"
import { Message } from "../message"
import { Notification2 } from "../notification_two"
import { ClickAction } from "../click_action"
import { Notification } from "../notification"
import { Android } from '../android';
import { TokenResponse } from '../token_response';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PushOperations } from "../push_operations"
import { CheckXMSProviderService } from '../check-xmsprovider.service';
import { GmsServiceService } from '../gms-service.service';

declare var cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pushUserToken: String = ""
  
  private pushOperations: PushOperations

  constructor(private _injector: Injector, private checkProvider:CheckXMSProviderService) {


    checkProvider.isHms.subscribe({
      next: (v) => {
        console.log("HMS?: ", v);
        if (v=='true') {
          console.log("Injecting Hms: ", v);
          this.pushOperations=<HmsServiceService>this._injector.get(HmsServiceService);
        }
        else {
          console.log("Injecting Gms: ", v);
          this.pushOperations=<GmsServiceService>this._injector.get(GmsServiceService);
          console.log("Injeced Gms: ", this.pushOperations);
        }
      },
      error:(e)=>{
        console.log("Injecting Gms2 after crash: ",e);
        this.pushOperations=<GmsServiceService>this._injector.get(GmsServiceService);
        console.log("Injeced Gms2: ", this.pushOperations);
      }
    });

    try{
      checkProvider.isHmsAvailable();
    }
    catch(e){
      console.log("Catch:",e)
      checkProvider.isHms.next('false')
    }
    
  }

  sendPush() {
    this.pushOperations.getTokenForPush();
  }
}
