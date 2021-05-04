import React, { useState, useEffect } from 'react'
import { Text, Image, View } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import { Row, Col } from 'react-native-easy-grid'
import { get, post, put } from '../apis/index'
import { getImage } from './utils';
const book_image_not_available = require('../assets/graphics/book_not_available.png')


export default function ChatBookExchangeComponent(props) {
    let book_to_be_received = JSON.parse(props.book_to_be_received)
    let book_to_be_sent = JSON.parse(props.book_to_be_sent)
    let exchange_id = props.exchange_id
    let context = props.context

    const [approved, setApproved] = useState(false);
    const [declined, setDeclined] = useState(false);

    useEffect(() => {
        if (props.is_approved == 1) {
            setApproved(true);

        }

        if (props.is_declined == 1) {
            setDeclined(true);
        }
    })

    const approve_exchange = async () => {
        let form = new FormData();
        let response = await get(context, `exchange/approve_exchange/${exchange_id}/`,)
        console.log(response)

        if (response.status) {
            let res = response.response
            if (res.isConfirmed) {
                setApproved(true);
                setDeclined(false);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
        }
    }

    const withdraw_exchange = async () => {
        let response = await get(context, `exchange/withdraw_exchange/${exchange_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isConfirmed) {
                setApproved(false);
                setDeclined(false);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
        }
    }

    const decline_exchange = async () => {
        let form = new FormData();
        let response = await get(context, `exchange/decline_exchange/${exchange_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isDeclined) {
                setApproved(false);
                setDeclined(true);
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

                    <Button
                        type="solid"
                        buttonStyle={{ backgroundColor: '#41cece' }}
                        title={approved ? "Withdraw" : "Approve"}
                        onPress={() => { if (approved) { withdraw_exchange(); } else { approve_exchange(); } }} />
                    <Button
                        onPress={() => { if (declined) { withdraw_exchange(); } else { decline_exchange(); } }}
                        title={declined ? "Withdraw" : "Decline"}
                        buttonStyle={{ backgroundColor: '#162b34' }}
                        type="solid" />
                </View>
            </Card>
        </View>
    )
}