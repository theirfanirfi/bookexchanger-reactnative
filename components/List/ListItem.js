import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import { _delete, post } from '../../apis/index'



export default function ListItem(props) {

    const [isAddedToList, setIsAddedToList] = useState(false)
    const [stack, setStack] = useState([])
    const deleteList = async (list_id) => {
        let response = await _delete(props.context, `list/${list_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isListDeleted) {
                props.deleteListCallBack(props.index)
            } else {
                alert(res.message);
            }
        }
    }

    const addToList = async () => {
        console.log('add ' + props.book_id)
        let form = new FormData();
        if (props.book_id != null) {
            form.append("book_id", props.book_id)
            form.append("list_id", props.list.list_id)
            let response = await post(props.context, 'stack', form)
            console.log(response);
            if (response.status) {
                let res = response.response
                if (res.isCreated) {
                    setIsAddedToList(true);
                    setStack(res.stack);
                    alert('Book added to list');
                } else {
                    alert(res.message);
                }
            }
        }
    }

    const removeFromList = async () => {
        console.log('remove')
        let response = await _delete(props.context, `stack/${stack.stack_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isDeleted) {
                setIsAddedToList(false)
                setStack([])
                alert('Book removed from list')
            } else {
                alert(res.message);
            }
        }
    }

    const navigateToList = () => {
        props.navigation.navigate('listbooksscreen', { list_id: props.list.list_id });
    }


    let list = props.list
    let isAddToList = props.isAddToList
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }} >

            <Row>
                <TouchableOpacity onPress={() => navigateToList()}>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{list.list_title}</Text>
                </TouchableOpacity>

            </Row>

            <Row>
                <Col style={{ flexDirection: 'row', marginTop: 18, justifyContent: 'flex-end' }}>
                    {/* <Icon name="retweet" color="gray" size={20} style={{ alignSelf: 'center', marginLeft: 6 }} /> */}

                    {isAddToList ? (
                        <>
                            {isAddedToList ? (
                                <TouchableOpacity onPress={() => removeFromList()}>
                                    <Icon type="ionicon" name="close-circle-outline" color="red" size={23} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => addToList()} >
                                    <Icon type="ionicon" name="add-circle-outline" color="black" size={23} />
                                </TouchableOpacity>
                            )}
                        </>

                    ) : (
                        <TouchableOpacity onPress={() => deleteList(list.list_id)}>
                            <Icon type="ionicon" name="trash" color="#162b34" size={23} />
                        </TouchableOpacity>
                    )}


                </Col>

            </Row>
        </Card>
    )
}