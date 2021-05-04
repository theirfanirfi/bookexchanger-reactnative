import React, { useState, useEffect } from 'react'
import { Text, Image, View } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import { Row, Col } from 'react-native-easy-grid'
import { get, post, _delete } from '../apis/index'
import { getImage } from './utils';

const book_image_not_available = require('../assets/graphics/book_not_available.png')


export default function ChatExchangeComponentForSender(props) {
    let book_to_be_received = JSON.parse(props.book_to_be_received)
    let book_to_be_sent = JSON.parse(props.book_to_be_sent)
    let exchange_id = props.exchange_id
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

    const delete_exchange = async () => {
        let response = await _delete(context, `exchange/${exchange_id}/`)
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

                        {book_to_be_received.book_cover_image != null &&
                            <Image
                                // source={{ uri: book_to_be_received.book_cover_image }} 
                                source={book_to_be_received.book_cover_image != undefined && !book_to_be_received.book_cover_image.includes('undefined') ? { uri: getImage('books', book_to_be_received.book_cover_image) } : book_image_not_available}
                                style={{ width: 80, height: 80 }} />
                        }
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold' }}>  {book_to_be_received.book_title}</Text>
                            <Text>  by {book_to_be_received.book_author}</Text>
                        </View>

                    </View>
                    <Text>You Will Get</Text>

                </Col>
                <Col style={{ justifyContent: 'center' }}>
                    <Icon name="repeat-outline" size={40} type="ionicon" />
                </Col>
                <Col>
                    <View style={{ flexDirection: 'row' }}>

                        {book_to_be_sent.book_cover_image != null &&
                            <Image
                                // source={{ uri: book_to_be_sent.book_cover_image }} 
                                source={book_to_be_sent.book_cover_image != undefined && !book_to_be_sent.book_cover_image.includes('undefined') ? { uri: getImage('books', book_to_be_sent.book_cover_image) } : book_image_not_available}

                                style={{ width: 80, height: 80 }} />
                        }
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontWeight: 'bold' }}>  {book_to_be_sent.book_title}</Text>
                            <Text>  by {book_to_be_sent.book_author}</Text>
                        </View>

                    </View>

                    <Text>You Will Share</Text>

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
                        onPress={() => { if (!deleted) { delete_exchange(); } }}
                        type="solid" />
                </View>
            </Card>
        </View>
    )
}