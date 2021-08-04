/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { Text, Image, View } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import { Row, Col } from 'react-native-easy-grid'
import { get, post, _delete } from '../apis/index'
import { getImage } from './utils';

const book_image_not_available = require('../assets/graphics/book_not_available.png')


export default function ChatBuyRequestSender(props) {
    let book = JSON.parse(props.book)
    let buy_id = props.buy_id
    let context = props.context

    const [approved, setApproved] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [declined, setDeclined] = useState(false);

    useEffect(() => {
        if (props.is_approved == 1) {
            setApproved(true);

        }

        if (props.is_declined == 1) {
            setDeclined(true);

        }
    })

    const delete_buy_request = async () => {
        let response = await _delete(context, `buy/${buy_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isDeleted) {
                setApproved(false);
                setDeclined(false);
                setDeleted(true);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
        }
    }



    return (
        <View style={{ marginTop: 12, marginBottom: 12 }}>
            <Card style={{ padding: 12, alignSelf: 'center', justifyContent: 'center', }}>
                <Col style={{ flexDirection: 'column' }}>

                    <View style={{ flexDirection: 'row' }}>

                        {book.book_cover_image != null &&
                            <Image
                                // source={{ uri: book_to_be_received.book_cover_image }} 
                                source={book.book_cover_image != undefined && !book.book_cover_image.includes('undefined') ? { uri: getImage('books', book.book_cover_image) } : book_image_not_available}
                                style={{ width: 80, height: 80 }} />
                        }
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold' }}>  {book.book_title}</Text>
                            <Text>  by {book.book_author}</Text>
                            <Text>  Price: {book.selling_price}$</Text>
                        </View>

                    </View>
                    <Text>Book Buying Request Sent</Text>

                </Col>

                {/* <View>
                            <Text style={{ textAlign: 'justify', marginVertical: 8 }}>{message.currentMessage.exchange_message}</Text>
                        </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                    {approved &&
                        <Button
                            type="solid"
                            buttonStyle={{ backgroundColor: '#41cece' }}
                            title="Approved"
                            disabled={true} />
                    }

                    {declined &&
                        <Button
                            title="Declined"
                            buttonStyle={{ backgroundColor: '#162b34' }}
                            disabled={true}
                            type="solid" />
                    }

                    <Button
                        title={deleted ? "Deleted" : "Delete"}
                        buttonStyle={{ backgroundColor: '#162b34' }}
                        disabled={deleted || approved ? true : false}
                        onPress={() => {
                            if (!deleted) {
                                delete_buy_request();
                            }
                        }}
                        type="solid" />
                </View>
            </Card>
        </View>
    )
}