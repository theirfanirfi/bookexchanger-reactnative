import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');




export default function LikeCommentNotificationComponent(props) {
    let notification = props.notification
    // console.log(notification)
    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: notification.user_id } })
    }
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('SinglePost', { screen: 'post', params: { post_id: notification.post_id } })}>
                <Row>
                    <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <TouchableOpacity onPress={() => navigateToUserProfile()}>

                            <CircularImage style={null} image={notification.profile_image} size="small" />
                        </TouchableOpacity>
                        <Row style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            </TouchableOpacity>
                            <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify' }}>has {notification.is_like == 1 ? <>
                                <Icon name="heart" color="red" size={16} type="ionicon" />

                          liked your post</> : <>commented on your post.</>}</Text>

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