import React, { Component, useEffect } from 'react'
import { Text, View, Platform, TouchableOpacity } from 'react-native'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from 'react-native-push-notification';
import { get, post, getToken } from '../../apis/index'

import BackgroundService from 'react-native-background-actions';

export default class PushNotificationComponent extends Component {

    background = async () => {
        let shouldContinue = true;

        const veryIntensiveTask = async (taskDataArguments) => {
            // Example of an infinite loop task
            const { delay } = taskDataArguments;
            await new Promise(async (resolve) => {

                // for (let i = 0; BackgroundService.isRunning(); i++) {
                //     console.log(i);
                setTimeout(() => this.get_notifications_request(), 10000);
                // }
            });
        };

        const options = {
            taskName: 'BookWonk',
            taskTitle: 'BookWonk',
            taskDesc: '',
            taskIcon: {
                name: 'ic_launcher',
                type: 'mipmap',
            },
            color: '#ff00ff',
            linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
            parameters: {
                delay: 1000,
            },
        };


        await BackgroundService.start(veryIntensiveTask, options);
    }

    get_notifications_request = async () => {
        const notification = await get(this, 'notification/get_notifications/')
        let notifications = notification.response
        if (notifications.isFound) {
            console.log('called')

            let all_notifications = notifications.notifications
            // console.log(all_notifications);
            all_notifications.forEach(notify => {
                // console.log(not)
                if (notify.is_for_sale == 1) {
                    if (notify.is_buy_confirmed == 1) {
                        this.notify('BookWonk', 'Your book buying request has been approved', notify);
                    } else if (notify.is_buy_declined == 1) {
                        this.notify('BookWonk', 'Your book buying request has been declined', notify);
                    } else {
                        this.notify('BookWonk', 'You have a book buying request.', notify);
                    }
                } else if (notify.is_exchange == 1 || notify.is_exchange_notification == 1) {
                    if (notify.is_exchange_confirmed == 1) {
                        this.notify('BookWonk', 'Your book exchange request has been confirmed.', notify);
                    } else if (notify.is_exchange_declined == 1) {
                        this.notify('BookWonk', 'Your book exchanged request has been declined', notify);
                    } else {
                        this.notify('BookWonk', 'You have a book exchange request.', notify);
                    }
                } else if (notify.is_like == 1) {
                    console.log(notify);
                    this.notify('BookWonk', 'You have a like on your post', notify);
                } else if (notify.is_comment == 1) {
                    this.notify('BookWonk', 'You have a comment on your post', notify);

                } else {
                    console.log('notification: ', notify)
                }
            });
        }



        setTimeout(() => this.get_notifications_request(), 10000);
    }

    initiate_chat = async (notification) => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("exchange_id", notification.exchange_id)
        let response = await post(this, `participant/initiate_chat/${notification.exchange_id}`, form)

        if (response.status) {
            let res = response.response

            if (res.isCreated) {
                console.log(res);
                this.props.navigation.navigate('SingleChat', { screen: 'Chat', params: { p_id: res.participants.p_id, username: notification.fullname, chat_with: notification.user_id } })
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }

    initiate_buy_chat = async (notification) => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("buy_id", notification.buy_id);
        let response = await post(this, `participant/initiate__buy_book_chat/${notification.buy_id}`, form)

        if (response.status) {
            let res = response.response

            if (res.isCreated) {
                console.log(res);
                this.props.navigation.navigate('SingleChat', { screen: 'Chat', params: { p_id: res.participants.p_id, username: notification.fullname, chat_with: notification.user_id } })
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }

    notificationOnClick = async (notification) => {
        let notify = notification.data
        console.log("onNotification: ", notification);
        if (notify.is_like == 1 || notify.is_comment == 1) {
            this.props.navigation.navigate('SinglePost', { screen: 'post', params: { post_id: notify.post_id } })
        } else if (notify.is_exchange == 1) {
            this.initiate_chat(notify)
        } else if (notify.is_for_sale == 1) {
            this.initiate_buy_chat(notify);
        }
    }

    constructor(props) {
        super(props);
        this.lastChannelCounter = 1;
        var that = this;
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                let notify = notification.data
                // console.log("onNotification: ", notification);
                that.notificationOnClick(notification);
                // if (notify.is_like == 1 || notify.is_comment == 1) {
                //     that.props.navigation.navigate('SinglePost', { screen: 'post', params: { post_id: notify.post_id } })
                // } else if (notify.is_exchange == 1) {
                //     that.initiate_chat(notify)
                // } else if (notify.is_for_sale == 1) {
                //     that.initiate_buy_chat(notify);
                // }
                // console.log("NOTIFICATION:", notification);

                // process the notification

                // (required) Called when a remote is received or opened, or local notification is opened
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
                // console.log(notification.id);
                PushNotification.cancelLocalNotifications({ id: notification.id.toString() });
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                console.log(notification.id);
                PushNotification.cancelLocalNotifications({ id: notification.id.toString() });

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: Platform.OS === 'ios'
        });

        this.createOrUpdateChannel();
    }



    notify = (n_title, n_message, notification) => {
        console.log("notification called");
        // console.log(PushNotification);
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "bookwonk-channel", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: n_title, // (optional)
            message: n_message, // (required)
            // repeatType: "minute",
            // repeatTime: 1,
            data: notification
        });
    }

    createOrUpdateChannel() {
        this.lastChannelCounter++;
        PushNotification.createChannel(
            {
                channelId: "bookwonk-channel", // (required)
                channelName: `bookwonk-channel: ${this.lastChannelCounter}`, // (required)
                channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    async componentWillUnmount() {
        if (!getToken(this)) {
            console.log('is loggein')
            await BackgroundService.stop();
        }
    }

    componentDidMount() {
        // setInterval(() => this.notify(), 5000);
        // this.notify();
        this.background();
        console.log("notification")
    };

    render() {
        return null;
    }
}
