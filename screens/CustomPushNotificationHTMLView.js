/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View } from 'react-native';

import colors from '../constants/colors';
import { WebView } from 'react-native-webview';

class CustomPushNotificationHTMLView extends React.Component {
    state = {
        notification: [],
        html: '<h1>Loading</h1>',
    }
    async componentDidMount() {
        const { notification } = await this.props.route.params;
        let html = "<style> * {margin:12px;} p {font-size:44px; text-align:justify;} h1 {font-size:60px;} h2 {font-size: 50px;} </style><h1>" + notification.notification_title + "</h1>";
        html += "<body>" + notification.notification_message + "</body>";
        this.setState({ notification: notification, html: html });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <WebView
                    source={{ html: this.state.html }}
                />
            </View>
        );
    }
}
export default CustomPushNotificationHTMLView;
