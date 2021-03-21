import React from 'react';
import { Image, Text } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Button } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment } from '../utils'
const profile_default_image = require('../../assets/images/default.png');
import Icon from 'react-native-vector-icons/FontAwesome'



export default function BookItem({ book }) {
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ width: 130 }}>
                    <Image style={{ height: 150 }} source={{ uri: book.post_image }} />
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{book.post_title}</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', margin: 6, color: 'black' }}>Irfan Irfi</Text>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{
                                textAlign: 'justify', fontSize: 14,
                                color: 'gray',
                                fontFamily: 'Roboto-Regular', margin: 6
                            }}>{book.post_description.length > 100 ? book.post_description.substr(0, 100) + '...' : book.post_description}</Text>

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button
                                title="Add to list" icon={
                                    <Icon
                                        name="plus-circle"
                                        size={20}
                                        color="skyblue"
                                        style={{ marginHorizontal: 8 }}
                                    />
                                }
                                type="outline"
                                containerStyle={{ marginHorizontal: 12 }} />
                        </Col>

                    </Row>

                </Col>
            </Row>

        </Card>
    )
}