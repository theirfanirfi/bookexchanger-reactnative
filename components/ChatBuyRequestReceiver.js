/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { Text, Image, View } from 'react-native'
import { Icon, Button, Card } from 'react-native-elements'
import { Row, Col } from 'react-native-easy-grid'
import { get, post, put } from '../apis/index'
import { getImage } from './utils';
const book_image_not_available = require('../assets/graphics/book_not_available.png')


export default function ChatBuyRequestReceiver(props) {
    let book = JSON.parse(props.book)
    let buy_id = props.buy_id
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

    const approve_request = async () => {
        let form = new FormData();
        let response = await get(context, `buy/approve_request/${buy_id}/`,)
        console.log(response)

        if (response.status) {
            let res = response.response;
            if (res.isConfirmed) {
                setApproved(true);
                setDeclined(false);
            } else {
                // return false;
                alert('Error occurred, please try again.')
            }
        } else {
            // return false;
            alert('Error occurred, please try again.')
        }
    }

    // const withdraw_exchange = async () => {
    //     let response = await get(context, `exchange/withdraw_exchange/${exchange_id}/`)
    //     console.log(response)
    //     if (response.status) {
    //         let res = response.response
    //         if (res.isConfirmed) {
    //             setApproved(false);
    //             setDeclined(false);
    //         } else {
    //             // return false;
    //             alert('Error occurred, please try again.')
    //         }
    //     } else {
    //         // return false;
    //     }
    // }

    const decline_request = async () => {
        let form = new FormData();
        let response = await get(context, `buy/decline_request/${buy_id}/`);
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isDeclined) {
                setApproved(false);
                setDeclined(true);
            } else {
                // return false;
                alert('Error occurred, please try again.');
            }
        } else {
            // return false;
            alert('Error occurred, please try again.');
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
                    {approved && !declined &&
                        <Button
                            type="solid"
                            buttonStyle={{ backgroundColor: '#41cece' }}
                            title={"Approved"}
                            disabled={true} />
                    }

                    {!approved && !declined &&
                        <>
                            <Button
                                type="solid"
                                buttonStyle={{ backgroundColor: '#41cece' }}
                                title="Approve"
                                onPress={() => { approve_request(); }} />
                            <Button
                                onPress={() => { decline_request(); }}
                                title="Decline"
                                buttonStyle={{ backgroundColor: '#162b34' }}
                                type="solid" />
                        </>
                    }

                    {!approved && declined &&

                        <Button
                            onPress={() => { if (declined && !approved) { } else { decline_request(); } }}
                            title="Declined"
                            disabled={true}
                            buttonStyle={{ backgroundColor: '#162b34' }}
                            type="solid" />
                    }
                </View>
            </Card>
        </View>
    )
}