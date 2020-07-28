import { Injectable } from '@angular/core';
import { PushOperations } from "../app/push_operations"
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Notification,Data,PushNotification } from "../app/google_push"


declare var cordova: any;
@Injectable({
  providedIn: 'root'
})
export class GmsServiceService implements PushOperations {

  private _fcm= new FCM()
  constructor(private _httpClient: HttpClient) {

    this._fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });   

   }
  getTokenForPush(){
    //Implementar con plugin utilizado
    console.log('Init GMS token rquest');
    this._fcm.getToken().then(token=>{
      console.log('Google token:',token)
      this.sendNotificationMessage("",token)
    })
    
  }
  
  getAuthorize(tokenForPush){
    //Implementar en servidor
    
  }
  sendNotificationMessage(authToken, userPushToken){
    //Implementar en servidor
    this.pushTokenService(authToken, userPushToken)
  }

  private postAuth(userPushToken, h: GmsServiceService) {
    //Authorization is given by the key API_KEY_SERVER_PUSH
  
  }

  private pushTokenService(authToken, userPushToken) {

    const notification: Notification = {
      sound: "default",
      body: "test body",
      title:"test title",
      content_available:true,
      "priority" : "high"
    }

    const data: Data = {
      sound:"default",
      body: "test body",
      title:"test title",
      content_available: true,
      priority:"high"
    }
    const pushNotification: PushNotification = {
      to: userPushToken,
      data:data,
      notification:notification
    }

    const postData = {
      method: 'post',
      data: JSON.stringify(pushNotification),
      headers: {
        'content-type': 'application/json',
        'authorization': 'key=' + API_KEY_SERVER_PUSH
      }

    }

    cordova.plugin.http.setDataSerializer("utf8");
    console.log('postdata:  ' + JSON.stringify(pushNotification))
    //App id from App gALLERY CONNECT 102557261.Include it on url por push as path variable.
    cordova.plugin.http.sendRequest(API_PUSH_SEND, postData, response=> {
      console.log('Success push response:', response)
      var obj = JSON.parse(response.data);
      console.log('Success push msg:', obj)
    }, response=> {
      console.log("Error sending push:->");
      console.log(response.error);
    });

  }

  

}
const API_KEY_SERVER_PUSH="<your_server_key>"
const API_PUSH_SEND = "https://fcm.googleapis.com/fcm/send";