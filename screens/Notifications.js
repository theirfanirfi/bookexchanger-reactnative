import * as React from 'react';
import { Text, Image, View, FlatList, RefreshControl } from 'react-native';
const nonotification = require('../assets/graphics/notnotification.png');
import { get, post, put, _delete } from '../apis/index'
import LikeCommentNotificationComponent from '../components/Notifications/LikeCommentNotificationComponent'
import ExchangeNotificationComponent from '../components/Notifications/ExchangeNotificationComponent'
import FollowNotificationComponent from '../components/Notifications/FollowNotificationComponent'
import ExchangeConfirmationNotificationComponent from '../components/Notifications/ExchangeConfirmationNotificationComponent';
export default class Notifications extends React.Component {
    state = {
        notifications: [],
        token: 'sometoken',
        user: [],
        refreshing: false,
        message: 'No notification for you at the moment'
    }

    exchangeDeclineCallBack = (context, index) => {
        console.log(index);

        let notifications = context.state.notifications
        console.log(notifications)
        notifications.splice(index, 1)
        context.setState({ notifications: notifications })
    }

    async getNotifications() {
        this.setState({ refreshing: true, message: 'loading...' });
        let response = await get(this, 'notification/')
        if (response.status) {
            let res = response.response
            if (res.notifications.length > 0) {
                this.setState({ notifications: res.notifications, refreshing: false, message: 'No notification for you at the moment' });

            } else {
                // return false;
                this.setState({ refreshing: false, message: 'No notification for you at the moment' });
            }
        } else {
            // return false;
            this.setState({ refreshing: false, message: 'No notification for you at the moment' });

        }
    }
    componentDidMount() {
        // const { term } = this.props.route.params
        // this.setState({ search_term: term }, () => console.log(this.state.search_term))
        this.getNotifications();
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props.route.params.term)
    //     if (props.route.params.term != state.search_term && props.route.params.term != undefined) {
    //         return {
    //             search_term: props.route.params.term
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    getNotificationItem = (index, item) => {
        if (item.is_like == 1 || item.is_comment == 1) {
            console.log('like')
            return <LikeCommentNotificationComponent notification={item} navigation={this.props.navigation} />
        } else if (item.is_exchange == 1) {
            console.log('exchange')
            return <ExchangeNotificationComponent index={index} exchangeDeclineCallBack={this.exchangeDeclineCallBack}
                context={this} notification={item} navigation={this.props.navigation} />
        } else if (item.is_follow == 1) {

        }
        else if (item.is_exchange_notification == 1) {
            return <ExchangeConfirmationNotificationComponent context={this} notification={item} navigation={this.props.navigation} />
        }
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>


                <FlatList
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getNotifications()} />
                    }
                    data={this.state.notifications}
                    // ListHeaderComponent={this.listHeader}
                    // onEndReached={() => this.nextPage()}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => { return item.notification_id }}
                    renderItem={({ index, item }) => this.getNotificationItem(index, item)}

                />
                {this.state.notifications.length == 0 && <>
                    <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1, marginBottom: 80 }}>
                        <Image source={nonotification} style={{ width: 200, height: 200, alignSelf: 'center', }} />
                        <Text style={{ alignSelf: 'center' }}>{this.state.message}</Text>
                    </View>
                </>}
            </View>
        )
    }
}

