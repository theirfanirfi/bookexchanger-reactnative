import React from 'react';
import { Image, Text } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'



export default function ListItem({ list }) {
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>

            <Row>
                <Col>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{list.list_name}</Text>
                </Col>

            </Row>

            <Row>
                <Col style={{ flexDirection: 'row', marginTop: 18, }}>
                    <Icon name="retweet" color="gray" size={20} style={{ alignSelf: 'center', marginLeft: 6 }} />
                    <Icon name="trash" color="red" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                </Col>

            </Row>
        </Card>
    )
}