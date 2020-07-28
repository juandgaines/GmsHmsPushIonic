export interface Notification {
    sound: string;
    body: string;
    title: string;
    content_available: boolean;
    priority: string;
}

export interface Data {
    sound: string;
    body: string;
    title: string;
    content_available: boolean;
    priority: string;
}

export interface PushNotification {
    to: string;
    notification: Notification;
    data: Data;
}