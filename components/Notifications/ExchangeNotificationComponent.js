import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon, Button } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');
import { get, post, put } from '../../apis/index'



export default function ExchangeNotificationComponent(props) {
    let notification = props.notification
    let book_to_be_received = JSON.parse(notification.book_to_received)
    let book_to_be_sent = JSON.parse(notification.book_to_send)

    const initiate_chat = async () => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("exchange_id", notification.exchange_id)
        let response = await post(props.context, `participant/initiate_chat/${notification.exchange_id}`, form)
        console.log(response);

        if (response.status) {
            let res = response.response
            console.log(res);
            if (res.isCreated) {
                alert('Created');
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }

    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <CircularImage style={null} image={null} size="small" />
                    <Row >
                        <Col style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                            <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify', }}>wants to exchange a book with you</Text>
                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{notification.created_at}</Text>



                        </Col>

                    </Row>


                </Col>

            </Row>
            <Row style={{ padding: 12 }}>
                <Col style={{ flexDirection: 'column' }}>
                    {book_to_be_received.book_cover_image == null &&
                        <Text>{book_to_be_received.book_title}</Text>
                    }
                    {book_to_be_received.book_cover_image != null &&
                        <Image source={{ uri: book_to_be_received.book_cover_image }} style={{ width: 80, height: 80 }} />
                    }
                    <Text>You Will get</Text>

                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Icon name="repeat-outline" size={40} type="ionicon" />
                </Col>
                <Col>
                    {book_to_be_sent.book_cover_image == null &&

                        <Text>{book_to_be_sent.book_title}</Text>
                    }
                    {book_to_be_sent.book_cover_image != null &&
                        <Image source={{ uri: book_to_be_sent.book_cover_image }} style={{ width: 80, height: 80 }} />
                    }
                    <Text>You Will Send</Text>

                </Col>
            </Row>

            <Row style={{ marginTop: 12 }}>
                <Col style={{ justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => initiate_chat()}>
                        <Icon type="ionicon" name="chatbox-ellipses-outline" />
                        <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Chat</Text>
                    </TouchableOpacity>
                </Col>
                <Col>
                    {/* <Text style={{ fontSize: 12, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text> */}

                </Col>
                <Col style={{ justifyContent: 'center' }}>

                    <Icon type="ionicon" name="close-outline" />
                    <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Decline</Text>
                </Col>


            </Row>


        </Card>
    )
}