import React from 'react';
import { Image, Text } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Button, Icon } from 'react-native-elements'



export default function BookItem({ book, isApiCall = false }) {
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ width: 100 }}>
                    <Image style={{ height: 110, marginRight: 12 }} source={{ uri: book.post_image }} />
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', margin: 6 }}>{book.post_title}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto-Light', marginLeft: 6, color: 'black' }}>by Irfan Irfi</Text>

                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ flexDirection: 'row', width: '40%' }}>
                            <Icon name="location-outline" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12 }}>6.7 Kms away</Text>
                        </Col>
                        <Col style={{ flexDirection: 'row' }}>

                            <Icon name="person" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12, marginLeft: 3 }}>Today</Text>

                        </Col>
                    </Row>


                </Col>
            </Row>

        </Card>
    )
}