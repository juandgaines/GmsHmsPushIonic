export interface PushOperations {
    getTokenForPush():void;
    getAuthorize(tokenForPush:string):void;
    sendNotificationMessage(authToken:string, userPushToken:string): void;
}