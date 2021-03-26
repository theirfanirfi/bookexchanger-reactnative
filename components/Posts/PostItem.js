import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment } from '../utils'
const profile_default_image = require('../../assets/images/default.png');



export default function PostItem({ post }) {
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <CircularImage style={null} image={null} size="small" />

                    <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>Irfan Irfi</Text>
                </Col>

            </Row>

            <Row>
                <Col>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text>
                </Col>

            </Row>
            <Row>
                <Col>
                    <Image style={{ width: '100%', height: 200 }} source={{ uri: post.post_image }} />
                </Col>
            </Row>



            <Row>
                <Col>
                    <Text style={{
                        textAlign: 'justify', fontSize: 14,
                        color: 'gray',
                        fontFamily: 'Roboto-Regular', margin: 6
                    }}>{post.post_description.length > 100 ? post.post_description.substr(0, 100) + '...' : post.post_description}</Text>

                </Col>
            </Row>




            <Row style={{ marginTop: 18 }}>
                <Col >
                    <TouchableOpacity>
                        <Icon name="heart-outline" type="ionicon" size={20} style={{ alignSelf: 'center', marginLeft: 6 }} />
                    </TouchableOpacity>
                </Col>
                <Col>
                    <TouchableOpacity>
                        <Icon name="chatbox-ellipses-outline" type="ionicon" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                    </TouchableOpacity>
                </Col>
                <Col>
                    <Text style={{ margin: 6, color: 'gray' }}>{"2020-12-04"}</Text>
                </Col>

            </Row>
        </Card>
    )
}