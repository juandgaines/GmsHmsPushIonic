import {Android} from "../app/android"
import {Notification} from "../app/notification"

export interface Message {
    notification: Notification;
    android: Android;
    token: string[];
}