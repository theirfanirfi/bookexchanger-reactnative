import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { _delete } from '../../apis/index'



export default function ListItem(props) {

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


    let list = props.list
    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }} >

            <Row>
                <Col>
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }} onPress={() => createBookDummyRequest()}>{list.list_title}</Text>
                </Col>

            </Row>

            <Row>
                <Col style={{ flexDirection: 'row', marginTop: 18, justifyContent: 'flex-end' }}>
                    {/* <Icon name="retweet" color="gray" size={20} style={{ alignSelf: 'center', marginLeft: 6 }} /> */}
                    <TouchableOpacity onPress={() => deleteList(list.list_id)}>
                        <Icon name="trash" color="red" size={23} />
                    </TouchableOpacity>

                </Col>

            </Row>
        </Card>
    )
}