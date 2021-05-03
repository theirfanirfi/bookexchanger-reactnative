import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'
import { getImage } from '../utils'
import BookExchangeComponent from './BookExchangeComponent'
const book_image_not_available = require('../../assets/graphics/book_not_available.png')




export default function BookExchangeItem(props) {

    const [isAdded, setIsAdded] = useState(false)
    const [addedBook, setAddedBook] = useState([])
    const [beingAddedToList, setBeingAddedToList] = useState(false)
    const [exchangedRequestSent, setExchangedRequestSent] = useState(false)
    const [exchangedRequest, setExchangedRequest] = useState([])

    useEffect(() => {
        // console.log("to provide: " + props.book_to_provide_in_exchange.user_id)
        // console.log("to get: " + props.book_to_get_in_exchange.user_id)
    })

    const makeExchangeRequest = async (book_to_provide_in_exchange) => {
        let form = new FormData();

        form.append("to_exchange_with_user_id", props.book_to_get_in_exchange.user_id)
        form.append("book_to_be_sent_id", book_to_provide_in_exchange.book_id)
        form.append("book_to_be_received_id", props.book_to_get_in_exchange.book_id)
        // console.log(props.book_to_get_in_exchange.user_id)
        // console.log(props.book_to_provide_in_exchange.user_id)

        let response = await post(props.context, 'exchange', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            // console.log(res)
            if (res.isCreated) {
                setExchangedRequestSent(true);
                setExchangedRequest(res.exchange)

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const initiateBookExchangeRequest = async () => {
        let form = new FormData();
        form.append("book_title", props.book_to_provide_in_exchange.book_title)
        form.append("book_description", "some description")
        form.append("book_isbn", props.book_to_provide_in_exchange.book_isbn)
        form.append("book_author", props.book_to_provide_in_exchange.book_author)
        form.append("book_cover_image", props.book_to_provide_in_exchange.book_cover_image)
        form.append("is_available_for_exchange", 0)
        form.append("book_added_from", "openlibrary")
        let response = await post(props.context, 'book', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                makeExchangeRequest(res.book);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const removeBook = async () => {

        let response = await _delete(props.context, `exchange/${exchangedRequest.exchange_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            // console.log(res);
            if (res.isDeleted) {
                setExchangedRequestSent(false);
                setExchangedRequest([])
                return true;
            } else {
                alert(res.message);
                return false;
            }
        } else {
            return false;
        }
    }

    const initiate_chat = async () => {
        // this.setState({ refreshing: true, message: 'loading...' });
        let form = new FormData();
        form.append("exchange_id", exchangedRequest.exchange_id)
        let response = await post(props.context, `participant/initiate_chat/${exchangedRequest.exchange_id}`, form)

        if (response.status) {
            let res = response.response
            console.log(res);
            if (res.isCreated) {
                console.log('Exchange with: ' + exchangedRequest.to_exchange_with_user_id);
                console.log('PID: ' + res.participants.p_id);
                props.navigation.navigate('SingleChat', { screen: 'Chat', params: { p_id: res.participants.p_id, username: 'Exchange Request', chat_with: exchangedRequest.to_exchange_with_user_id } })
                // props.navigation.navigate('Chats', { screen: 'Chat', params: { p_id: res.participants.p_id, username: 'Exchange Request', chat_with: props.book_to_get_in_exchange.user_id } })
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }

    }


    let book = props.book_to_provide_in_exchange
    return (
        <TouchableOpacity style={{ borderWidth: 0.4, borderColor: 'white', marginVertical: 14, padding: 12 }}>
            <Row>
                <Col style={{ width: 100 }}>
                    <Image style={{ height: 110, marginRight: 12, width: 100 }} source={book.book_cover_image != undefined && !book.book_cover_image.includes('undefined') ? { uri: getImage('books', book.book_cover_image) } : book_image_not_available} />
                </Col>

                <Col>
                    <Row>
                        <Col>
                            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', margin: 6 }}>{book.book_title}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto-Light', marginLeft: 6, color: 'black' }}>by {book.book_author}</Text>

                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ flexDirection: 'row', width: '40%' }}>
                            {exchangedRequestSent &&
                                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => initiate_chat()}>
                                    <Icon name="chatbox-ellipses-outline" type="ionicon" color="black" size={20} />
                                    <Text style={{ alignSelf: 'center', fontSize: 10 }}>Initiate Chat</Text>
                                </TouchableOpacity>
                            }
                        </Col>
                        <Col style={{ flexDirection: 'row' }}>

                            {/* <Icon name="person" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12, marginLeft: 3 }}>Today</Text> */}

                        </Col>

                        <Row>
                            <Col>
                                {exchangedRequestSent ? (
                                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => removeBook()}>
                                        <Icon name="close-outline" type="ionicon" color="red" size={26} />
                                        <Text style={{ alignSelf: 'center', fontSize: 12 }}>Cancel</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => initiateBookExchangeRequest()}>
                                        <Icon name="add-outline" type="ionicon" size={26} />
                                        <Text style={{ alignSelf: 'center', fontSize: 12 }}>Provide</Text>
                                    </TouchableOpacity>
                                )}
                            </Col>
                        </Row>

                    </Row>





                </Col>
            </Row>

        </TouchableOpacity>
    )
}