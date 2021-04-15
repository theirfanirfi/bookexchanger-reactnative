import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');




export default function LikeCommentNotificationComponent(props) {
    let notification = props.notification
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <CircularImage style={null} image={null} size="small" />
                    <Row style={{ flexDirection: 'row' }}>
                        <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                        <Text style={{ margin: 6, fontSize: 16, color: 'gray' }}>has{notification.is_like == 1 ? <>
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










        </Card>
    )
}