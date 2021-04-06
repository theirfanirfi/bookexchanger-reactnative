import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Button, Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'
import { getImage } from '../utils'
import BookExchangeComponent from './BookExchangeComponent'




export default function BookItem(props) {

    const [isAdded, setIsAdded] = useState(false)
    const [addedBook, setAddedBook] = useState([])
    const [beingAddedToList, setBeingAddedToList] = useState(false)
    const [exchangedRequestSent, setExchangedRequestSent] = useState(false)
    const [exchangedRequest, setExchangedRequest] = useState([])

    const addBook = async () => {
        let form = new FormData();
        form.append("book_title", "some title")
        form.append("book_description", "some description")
        form.append("book_isbn", "some isbn")
        form.append("book_author", "some author")
        form.append("book_cover_image", "some cover_image")
        form.append("book_added_from", "some from")
        let response = await post(props.context, 'book', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                setIsAdded(true);
                setAddedBook(res.book)
                console.log(`${addedBook}`)

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const removeBook = async () => {
        let response = await _delete(props.context, `book/${addedBook.book_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isDeleted) {
                setIsAdded(false);
                setAddedBook([])
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

    let book = props.book
    let isApiCall = props.isApiCall
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
                            <Icon name="location-outline" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12 }}>{book.distance_in_km} Kms away</Text>
                        </Col>
                        <Col style={{ flexDirection: 'row' }}>

                            <Icon name="person" type="ionicon" color="#96A787" size={14} />
                            <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12, marginLeft: 3 }}>Today</Text>

                        </Col>
                        {!isApiCall &&
                            <Row>
                                <Col>
                                    <BookExchangeComponent book={book} />
                                </Col>
                            </Row>
                        }
                    </Row>





                </Col>
            </Row>
            {isApiCall &&
                <Row style={{ marginTop: 22 }}>
                    <Col>

                        {isAdded ? (
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => removeBook()}>
                                <Icon name="close-outline" type="ionicon" color="red" size={26} />
                                <Text style={{ alignSelf: 'center', fontSize: 12 }}>Remove</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => addBook()}>
                                <Icon name="add-outline" type="ionicon" size={26} />
                                <Text style={{ alignSelf: 'center', fontSize: 12 }}>Add</Text>
                            </TouchableOpacity>
                        )}

                    </Col>
                    <Col>
                        <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => addBookToList()}>
                            {beingAddedToList ? (
                                <>
                                    <ActivityIndicator size="small" color="black" />
                                    <Text style={{ alignSelf: 'center', fontSize: 11 }}>Please wait</Text>
                                </>
                            ) : (
                                <>
                                    <Icon name="add-circle-outline" type="ionicon" size={26} />
                                    <Text style={{ alignSelf: 'center', fontSize: 12 }}>Add to list</Text>
                                </>
                            )}


                        </TouchableOpacity>
                    </Col>
                </Row>
            }

        </Card>
    )
}