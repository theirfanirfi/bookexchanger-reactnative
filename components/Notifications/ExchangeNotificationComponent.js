import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon, Button } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');
import { get, post, put } from '../../apis/index'
const book_image_not_available = require('../../assets/graphics/book_not_available.png')

export default function ExchangeNotificationComponent(props) {
    let notification = props.notification
    let book_to_be_received = JSON.parse(notification.book_to_received)
    let book_to_be_sent = JSON.parse(notification.book_to_send)

    if (notification.is_exchanged_with_me == 1) {
        book_to_be_received = book_to_be_sent
        book_to_be_sent = JSON.parse(notification.book_to_received)
    }

    const [declined, setDeclined] = useState(false)


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

    const decline_exchange = async () => {
        let form = new FormData();
        let response = await get(props.context, `exchange/decline_exchange/${notification.exchange_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            console.log(res);
            if (res.isDeclined) {
                // setApproved(false);
                setDeclined(true);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
        }

    }

    const withdraw_exchange = async () => {
        let response = await get(props.context, `exchange/withdraw_exchange/${notification.exchange_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isConfirmed) {
                setDeclined(false);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
        }
    }

    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: notification.user_id } })
    }

    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <TouchableOpacity onPress={() => navigateToUserProfile()}>

                        <CircularImage style={null} image={null} size="small" />
                    </TouchableOpacity>
                    <Row >
                        <Col style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            </TouchableOpacity>
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
                        <Image
                            source={book_to_be_received.book_cover_image != undefined && !book_to_be_received.book_cover_image.includes('undefined') ? { uri: getImage('books', book_to_be_received.book_cover_image) } : book_image_not_available}
                            style={{ width: 80, height: 80 }} />
                    }
                    <Text>You Will Get</Text>

                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Icon name="repeat-outline" size={40} type="ionicon" />
                </Col>
                <Col>
                    {book_to_be_sent.book_cover_image == null &&

                        <Text>{book_to_be_sent.book_title}</Text>
                    }
                    {book_to_be_sent.book_cover_image != null &&
                        <Image
                            source={book_to_be_sent.book_cover_image != undefined && !book_to_be_sent.book_cover_image.includes('undefined') ? { uri: getImage('books', book_to_be_sent.book_cover_image) } : book_image_not_available} style={{ width: 80, height: 80 }} />
                    }
                    <Text>You Will Share</Text>

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
                    {declined ? (
                        <TouchableOpacity onPress={() => withdraw_exchange()}>
                            <Icon type="ionicon" name="close-outline" />
                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Withdraw</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => decline_exchange()}>
                            <Icon type="ionicon" name="close-outline" />
                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Decline</Text>
                        </TouchableOpacity>
                    )}

                </Col>


            </Row>


        </Card>
    )
}