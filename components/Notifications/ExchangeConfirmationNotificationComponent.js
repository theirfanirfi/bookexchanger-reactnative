import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
import { post } from '../../apis/index'
const profile_default_image = require('../../assets/images/default.png');




export default function ExchangeConfirmationNotificationComponent(props) {
    let notification = props.notification

    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: notification.user_id } })
    }

    const initiate_chat = async () => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("exchange_id", notification.exchange_id)
        let response = await post(props.context, `participant/initiate_chat/${notification.exchange_id}`, form)

        if (response.status) {
            let res = response.response

            if (res.isCreated) {
                console.log(res);
                props.navigation.navigate('Chat', { p_id: res.participants.p_id, username: notification.fullname, chat_with: notification.user_id })
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <TouchableOpacity onPress={() => initiate_chat()}>
                <Row>
                    <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <TouchableOpacity onPress={() => navigateToUserProfile()}>

                            <CircularImage style={null} image={notification.profile_image} size="small" />
                        </TouchableOpacity>
                        <Row style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            </TouchableOpacity>
                            <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify' }}>{notification.is_exchange_confirmed == 1 ? <>
                                confirmed your exchange request</> : <>declined your exchange request</>}</Text>

                        </Row>


                    </Col>

                </Row>

                <Row>
                    <Col>
                        {/* <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text> */}
                        <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{notification.created_at}</Text>
                    </Col>
                    <Col></Col>
                    <Col>
                    </Col>

                </Row>







            </TouchableOpacity>


        </Card>
    )
}