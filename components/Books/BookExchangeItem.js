import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Button, Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'
import { getImage } from '../utils'
import BookExchangeComponent from './BookExchangeComponent'




export default function BookExchangeItem(props) {

    const [isAdded, setIsAdded] = useState(false)
    const [addedBook, setAddedBook] = useState([])
    const [beingAddedToList, setBeingAddedToList] = useState(false)
    const [exchangedRequestSent, setExchangedRequestSent] = useState(false)
    const [exchangedRequest, setExchangedRequest] = useState([])

    const makeExchangeRequest = async (book_to_provide_in_exchange) => {
        console.log(book_to_provide_in_exchange);
        let form = new FormData();

        form.append("to_exchange_with_user_id", props.book_to_get_in_exchange.user_id)
        form.append("book_to_be_sent_id", book_to_provide_in_exchange.book_id)
        form.append("book_to_be_received_id", props.book_to_get_in_exchange.book_id)

        let response = await post(props.context, 'exchange', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                setExchangedRequestSent(true);
                setExchangedRequest(res.exchange)
                console.log(res.exchange)
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const initiateBookExchangeRequest = async () => {
        // console.log(props.book_to_provide_in_exchange.book_id + " " + props.book_to_get_in_exchange.book_id)
        let form = new FormData();
        form.append("book_title", props.book_to_provide_in_exchange.book_title)
        form.append("book_description", "some description")
        form.append("book_isbn", props.book_to_provide_in_exchange.book_isbn)
        form.append("book_author", props.book_to_provide_in_exchange.book_author)
        form.append("book_cover_image", props.book_to_provide_in_exchange.book_cover_image)
        form.append("book_added_from", "google")
        let response = await post(props.context, 'book', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                console.log(res.book);
                // setIsAdded(true);
                // setAddedBook(res.book)
                // console.log(`${addedBook}`)
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
            console.log(res);
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

    const addBookToList = async () => {
        setBeingAddedToList(true)
        let isBookAdded = addBook();
        if (isBookAdded) {
            setBeingAddedToList(false)
            console.log(addedBook)
            // props.navigation.navigate('addtolistscreen', { book_id: addedBook.book_id })
        } else {
            alert('Error occurred. Please try again')
        }
    }

    let book = props.book_to_provide_in_exchange
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <Row>
                <Col style={{ width: 100 }}>
                    <Image style={{ height: 110, marginRight: 12 }} source={{ uri: getImage('books', book.book_cover_image) }} />
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
                            {/* <Icon name="location-outline" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12 }}>{book.distance_in_km} Kms away</Text> */}
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

        </Card>
    )
}