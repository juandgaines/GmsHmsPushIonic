import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { PushNotification } from "../app/push_notification"
import { Message } from "../app/message"
import { Notification2 } from "../app/notification_two"
import { ClickAction } from "../app/click_action"
import { Notification } from "../app/notification"
import { Android } from '../app/android';
import { TokenResponse } from '../app/token_response';
import { Observable, from } from 'rxjs';
import { HomePage } from "./home/home.page"
import { PushOperations } from "../app/push_operations"


declare var cordova: any;
@Injectable({
  providedIn: 'root'
})

export class HmsServiceService implements PushOperations {

  constructor(private _httpClient: HttpClient) {
    //Data message reception
    cordova.plugins.HMSPush.onMessageReceived("",
      _res => {
        console.log('Success', _res), // Success callback
          alert("MessageReceived:  a:" + _res['a'] + " b: " + _res['b']);
      }
      , _err => {
        alert("MessageError: " + _err);
        console.log('Error', _err); // Error callback
      });

  }

  getTokenForPush() {
    let tokenForPush: string = this.getToken();
    if (tokenForPush != '') {
      this.getAuthorize(tokenForPush)
    }
  }
  getAuthorize(tokenForPush) {
    this.postAuth(tokenForPush, this);
  }

  sendNotificationMessage(authToken, userPushToken) {
    this.pushTokenService(authToken, userPushToken);
  }

  private getToken(): any {

    cordova.plugins.HMSPush.getToken("Get Token HMS",
      _res => {
        console.log('Success HMS', _res), // Success callback
          //Server
          this.postAuth(_res, this)
        //alert("Get Token Success, Push Token : " + _res);
        return _res
      }
      , _err => {
        alert("Get Token Fail: " + _err);
        console.log('Error', _err); // Error callback
        return "No token retrieved"
      });
  }

  private postAuth(userPushToken, h: HmsServiceService): any {
    const postData = {
      method: 'post',
      data: {
        //client secret and client id extracted from AppGallery console
        grant_type: "client_credentials",
        client_secret: '<your_app_secret_id>',
        client_id: '<your_app_id>'
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' }

    }
    cordova.plugin.http.setDataSerializer("urlencoded");
    cordova.plugin.http.sendRequest(API_TOKEN, postData, function (response) {
      var obj = JSON.parse(response.data);
      var at = obj['access_token']
      console.log('Success access_token:', response.data)
      console.log('Success access_token:', at)
      console.log('user Push token:', userPushToken)
      h.sendNotificationMessage(at, userPushToken)
    }, function (response) {
      console.log(response.error);
    });
  }


  private pushTokenService(authToken, userPushToken) {

    const click_action: ClickAction = {
      type: 1,
      intent: '#Intent;compo=com.rvr/.Activity;S.W=U;end'
    }

    const notification2t: Notification2 = {
      title: "Prueba",
      body: "Este es un body de prueba",
      click_action: click_action

    }
    const android: Android = {
      notification: notification2t
    }

    const notification: Notification = {
      title: "Prueba",
      body: "Este es un texto de pruebaaaa"
    }

    const message_t: Message = {
      notification: notification,
      android: android,
      token: [userPushToken]
    }
    const pushNotification: PushNotification = {
      validate_only: false,
      message: message_t
    }

    const postData = {
      method: 'post',
      data: JSON.stringify(pushNotification),
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + authToken
      }

    }

    cordova.plugin.http.setDataSerializer("utf8");
    console.log('Bearer ' + authToken)
    console.log('postdata:  ' + JSON.stringify(pushNotification))
    //App id from App gALLERY CONNECT 102557261.Include it on url por push as path variable.
    cordova.plugin.http.sendRequest(API_PUSH_SEND, postData, (response) => {
      console.log('Success push response:', response)
      var obj = JSON.parse(response.data);
      console.log('Success push sent:', response.response)
      console.log('Success push msg:', obj['msg'])
    }, response => {
      console.log("Error sending push:->");
      console.log(response.error);
    });

  }

}

const API_TOKEN = "https://oauth-login.cloud.huawei.com/oauth2/v2/token";
const API_PUSH_SEND = "https://push-api.cloud.huawei.com/v1/<your_app_id>/messages:send";