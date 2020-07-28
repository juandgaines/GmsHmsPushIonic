# Push kit HMS+ GMS example guide

## AppGallery Connect Configuration
Please follow the [instructions](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/config-agc-0000001050135709) to enable push on the project and your AppGallery Connect console (Also you will need to enable push notification on firebase). Then add agconnect-services.json to root directory [instructions](https://developer.huawei.com/consumer/en/doc/development/HMS-Plugin-Guides/push-integrating-cordova-sdk-0000001050135717).


## Plugins
For this project, you will need to use the following plugins for Cordova.

-[CordovaHMSGMSCheckPlugin](https://github.com/salmanyaqoob/Cordova-All-HMS-Kits/tree/master/CordovaHMSPlugin/CordovaHMSGMSCheckPlugin): Check if HMS or GMS is avalaible on the phone.

-[cordova-plugin-hms-push-4.0.3](https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Library-V1/cordova-sdk-download-0000001050133798-V1): Huawei Push kit pluging.

[FCM](https://ionicframework.com/docs/native/fcm): Firebase plugin

Install the plugins using the following command


```bash
ionic cordova plugin add CORDOVA_PLUGIN_PATH
```

## Modify the following files with your credentials.

gms-service.service.ts : Replace the API_KEY_SERVER_PUSH with yours given by Firebase
```javascript
...
const API_KEY_SERVER_PUSH="<Replace-with-your-server-key>";
const API_PUSH_SEND = "https://fcm.googleapis.com/fcm/send";
```
hms-service.service.ts: replace the credentials with the ones given by the App gallery connect on your App.


```javascript
...
const postData = {
      method: 'post',
      data: {
        //client secret and client id extracted from AppGallery console
        grant_type: "client_credentials",
        client_secret: '<your client secret>',
        client_id: '<your client id>'
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' }

    }
...
```

Change the path over the API_PUSH_SEND to include your App id in the URL.
```javascript
const API_TOKEN = "https://oauth-login.cloud.huawei.com/oauth2/v2/token";
const API_PUSH_SEND = "https://push-api.cloud.huawei.com/v1/<your_app_id>/messages:send";
```


Run the project: 
```bash
ionic cordova build android
ionic cordova run android
```