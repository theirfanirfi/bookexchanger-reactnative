/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon, Button } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
import { get, post, _delete } from '../../apis/index'
const book_image_not_available = require('../../assets/graphics/book_not_available.png')

export default function BuyBookNotificationComponent(props) {
    let notification = props.notification
    console.log(notification.is_buy_confirmed)
    let book = JSON.parse(notification.buybook)

    const [declined, setDeclined] = useState(false);


    const initiate_chat = async () => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("buy_id", notification.buy_id);
        let response = await post(props.context, `participant/initiate__buy_book_chat/${notification.buy_id}`, form)

        if (response.status) {
            let res = response.response

            if (res.isCreated) {
                // console.log(res);
                props.navigation.navigate('Chat', { p_id: res.participants.p_id, username: notification.fullname, chat_with: notification.user_id })
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }

    // const decline_exchange = async () => {
    //     let form = new FormData();
    //     let response = await get(props.context, `exchange/decline_exchange/${notification.exchange_id}/`)
    //     console.log(response)
    //     if (response.status) {
    //         let res = response.response
    //         console.log(res);
    //         if (res.isDeclined) {
    //             props.exchangeDeclineCallBack(props.context, props.index)
    //         } else {
    //             // return false;
    //             alert('Error occurred, please try again.')
    //         }
    //     } else {
    //         // return false;
    //     }

    // }

    // const delete_exchange = async () => {
    //     let response = await _delete(context, `exchange/${notification.exchange_id}/`)
    //     if (response.status) {
    //         let res = response.response
    //         if (res.isDeleted) {
    //             alert('Exchange request deleted');
    //         } else {
    //             // return false;
    //             alert('Error occurred, please try again.')
    //         }
    //     } else {
    //         // return false;
    //     }
    // }

    // const withdraw_exchange = async () => {
    //     let response = await get(props.context, `exchange/withdraw_exchange/${notification.exchange_id}/`)
    //     console.log(response)
    //     if (response.status) {
    //         let res = response.response
    //         if (res.isConfirmed) {
    //             setDeclined(false);
    //         } else {
    //             // return false;
    //             alert('Error occurred, please try again.')
    //         }
    //     } else {
    //         // return false;
    //     }
    // }

    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: notification.user_id } })
    }

    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                    <TouchableOpacity onPress={() => navigateToUserProfile()}>

                        <CircularImage style={null} image={notification.profile_image} size="small" />
                    </TouchableOpacity>
                    <Row >
                        <Col style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{notification.fullname}</Text>
                            </TouchableOpacity>
                            {notification.am_i_book_holder == 1 ? (
                                <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify', }}>wants to buy your book</Text>
                            ) : (
                                <>
                                    {notification.is_buy_confirmed == "1" &&
                                        <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify', }}>Approved your book buy request.</Text>
                                    }

                                    {notification.is_buy_declined == 1 &&
                                        <Text style={{ margin: 6, fontSize: 16, color: 'gray', textAlign: 'justify', }}>Declined your book buy request.</Text>
                                    }
                                </>
                            )}

                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{notification.created_at}</Text>
                        </Col>

                    </Row>


                </Col>

            </Row>
            <Row style={{ padding: 12 }}>
                <Col style={{ flexDirection: 'column' }}>
                    {book.book_cover_image == null &&
                        <Text>{book.book_title}</Text>
                    }
                    {book.book_cover_image != null &&
                        <Image
                            source={book.book_cover_image != undefined && !book.book_cover_image.includes('undefined') ? { uri: getImage('books', book.book_cover_image) } : book_image_not_available}
                            style={{ width: 80, height: 80 }} />
                    }


                </Col>
            </Row>

            {notification.is_buy_confirmed == 0 && notification.is_buy_declined == 0 ? (
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
                    {/* <Col style={{ justifyContent: 'center' }}>
                        {declined ? (
                            <TouchableOpacity onPress={() => delete_exchange()}>
                                <Icon type="ionicon" name="trash-outline" />
                                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Delete</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => decline_exchange()}>
                                <Icon type="ionicon" name="close-outline" />
                                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>Decline</Text>
                            </TouchableOpacity>
                        )}

                    </Col> */}


                </Row>
            ) : (
                <Row style={{ marginTop: 12 }}>
                    <Col style={{ justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => initiate_chat()}>
                            <Icon type="ionicon" name="chatbox-ellipses-outline" />
                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8, alignSelf: 'center' }}>View</Text>
                        </TouchableOpacity>
                    </Col>
                    <Col>
                        {/* <Text style={{ fontSize: 12, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text> */}

                    </Col>
                    <Col style={{ justifyContent: 'center' }}>
                        {notification.is_buy_confirmed == 1 ? (
                            <TouchableOpacity>
                                <Icon type="ionicon" name="checkmark-circle-outline" color="green" />
                                <Text style={{ fontSize: 11, color: 'green', marginLeft: 8, alignSelf: 'center' }}>Approved</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity>
                                <Text style={{ fontSize: 11, color: 'red', marginLeft: 8, alignSelf: 'center', }}>Declined</Text>
                            </TouchableOpacity>
                        )}

                    </Col>
                </Row>

            )
            }


        </Card>
    )
}