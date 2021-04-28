import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
const profile_default_image = require('../../assets/images/default.png');



export default function UserRowComponent(props) {
    let user = props.user
    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: user.user_id } })
    }

    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                <Row>
                    <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <TouchableOpacity onPress={() => navigateToUserProfile()}>

                            <CircularImage style={null} image={user.profile_image} size="small" />
                        </TouchableOpacity>
                        <Row style={{ flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{user.fullname}</Text>
                            </TouchableOpacity>

                        </Row>


                    </Col>

                </Row>
            </TouchableOpacity>
        </Card>
    )
}