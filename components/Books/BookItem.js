import React from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Button, Icon } from 'react-native-elements'
import { post, _delete, put, generic_request } from '../../apis/index'
import { getImage } from '../utils'
const book_image_not_available = require('../../assets/graphics/book_not_available.png')

import BookExchangeComponent from './BookExchangeComponent'




export default class BookItem extends React.Component {
    state = {
        isAdded: false,
        addedBook: [],
        beingAddedToList: false,
        exchangedRequestSent: false,
        exchangedRequest: [],
        user: [],
        token: 'sometoken'
    }

    // const [isAdded, setIsAdded] = useState(false)
    // const [addedBook, setBook] = useState(null)
    // const [beingAddedToList, setBeingAddedToList] = useState(false)
    // const [exchangedRequestSent, setExchangedRequestSent] = useState(false)
    // const [exchangedRequest, setExchangedRequest] = useState([])

    addBook = async (is_available_for_exchange = 1) => {
        let book = this.props.book
        let form = new FormData();
        form.append("book_title", book.book_title)
        form.append("book_description", "some description")
        form.append("book_isbn", book.book_isbn)
        form.append("book_author", book.book_author)
        form.append("book_cover_image", book.book_cover_image)
        form.append("book_added_from", "openlibrary")
        form.append("is_available_for_exchange", is_available_for_exchange)
        let response = await post(this, 'book', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                this.setState({ isAdded: true, addedBook: res.book });
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    addOrRemoveFromExchange = async (is_available_for_exchange) => {
        let book = this.props.book
        let form = new FormData();
        form.append("is_available_for_exchange", is_available_for_exchange);
        let response = await put(this, `book/${book.book_id}`, form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isUpdated) {
                this.setState({ isAdded: !this.state.isAdded, addedBook: res.book });
                return true;
            } else {
                alert(res.message);
                return false;
            }
        } else {
            return false;
        }
    }

    removeBook = async () => {
        let response = await _delete(this, `book/${this.state.addedBook.book_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isDeleted) {
                this.setState({ isAdded: false, addedBook: [] });

                return true;
            } else {
                alert(res.message);
                return false;
            }
        } else {
            return false;
        }
    }

    deleteBook = async () => {
        let response = await generic_request(this, 'DELETE', `book/delete_book/${this.props.book.book_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            console.log(res);
            if (res.isDeleted) {
                this.setState({ isAdded: false, addedBook: [] });
                this.props.removeBookCallBack(this.props.context, this.props.index)
                return true;
            } else {
                alert(res.message);
                return false;
            }
        } else {
            return false;
        }
    }

    addBookToList = async () => {
        // this.setState({ beingAddedToList: true });
        // let isBookAdded = await this.addBook(0);
        // let book = {"book_title": book.book_title,
        // "book_description": "some description",
        // "book_isbn": book.book_isbn,
        // form.append("book_author", book.book_author)
        // form.append("book_cover_image", book.book_cover_image)
        // form.append("book_added_from", "openlibrary")
        // form.append("is_available_for_exchange", is_available_for_exchange)

        // if (isBookAdded) {
        this.setState({ beingAddedToList: false });
        this.props.navigation.navigate('addtolistscreen', { book: this.props.book })
        //     // console.log(this.state.addedBook)
        // } else {
        //     alert('Error occurred. Please try again')
        // }

        // let book = this.props.book
        // console.log(book)
    }
    componentDidMount() {
        if (this.props.book.is_available_for_exchange == 1) {
            this.setState({ isAdded: true });
        }
    }
    render() {
        let book = this.props.book
        let isApiCall = this.props.isApiCall
        return (
            <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
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
                            {!isApiCall && !this.props.show_delete_option &&
                                <>
                                    <Col style={{ flexDirection: 'row', width: '45%' }}>
                                        <Icon name="location-outline" type="ionicon" color="#96A787" size={14} />
                                        <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12 }}>{book.distance_in_km > 0 ? book.distance_in_km.toFixed(2) : book.distance_in_km} Kms away</Text>
                                    </Col>
                                    <Col style={{ flexDirection: 'row' }}>

                                        <Icon name="person" type="ionicon" color="#96A787" size={14} />
                                        <Text style={{ color: '#96A787', fontWeight: 'bold', fontSize: 12, marginLeft: 3 }}>{book.created_at.substr(0, 10)}</Text>

                                    </Col>
                                </>
                            }
                            {!isApiCall &&
                                <>
                                    {this.props.show_delete_option ? (
                                        <Row style={{ marginTop: 20 }}>
                                            <Col>

                                                {this.state.isAdded ? (
                                                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.addOrRemoveFromExchange(0)}>
                                                        <Icon name="close-outline" type="ionicon" color="red" size={26} />
                                                        <Text style={{ alignSelf: 'center', fontSize: 12 }}>Remove from exchange</Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.addOrRemoveFromExchange(1)}>
                                                        <Icon name="add-outline" type="ionicon" size={26} />
                                                        <Text style={{ alignSelf: 'center', fontSize: 12 }}>Add to exchange</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </Col>

                                            <Col>
                                                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.deleteBook()}>
                                                    <Icon name="trash-outline" type="ionicon" size={26} />
                                                    <Text style={{ alignSelf: 'center', fontSize: 12 }}>Delete</Text>
                                                </TouchableOpacity>

                                            </Col>


                                        </Row>
                                    ) : (
                                        <Row>
                                            <Col>
                                                {/* <BookExchangeComponent book={book} /> */}
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('bookexchangesearchapi', { book: book })}>

                                                    <Icon name="repeat-outline" type="ionicon" size={26} />

                                                </TouchableOpacity>
                                            </Col>
                                        </Row>
                                    )}

                                </>
                            }
                        </Row>





                    </Col>
                </Row>
                {isApiCall &&
                    <Row style={{ marginTop: 22 }}>
                        <Col>

                            {this.state.isAdded ? (
                                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.removeBook()}>
                                    <Icon name="close-outline" type="ionicon" color="red" size={26} />
                                    <Text style={{ alignSelf: 'center', fontSize: 12 }}>Remove</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.addBook()}>
                                    <Icon name="add-outline" type="ionicon" size={26} />
                                    <Text style={{ alignSelf: 'center', fontSize: 12 }}>Add to exchange</Text>
                                </TouchableOpacity>
                            )}

                        </Col>
                        <Col>
                            <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'center' }} onPress={() => this.addBookToList()}>
                                {this.state.beingAddedToList ? (
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
}