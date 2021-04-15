import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');



export default function ExchangeNotificationComponent(props) {
    let notification = props.notification
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <CircularImage style={null} image={null} size="small" />
                    <Row >
                        <Col style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify', }}>wants to exchange a book with you</Text>


                        </Col>

                    </Row>


                </Col>

            </Row>

            <Row>
                <Col>
                    {/* <Text style={{ fontSize: 12, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text> */}
                    <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{notification.created_at}</Text>

                </Col>

            </Row>


        </Card>
    )
}