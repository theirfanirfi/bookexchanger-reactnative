import React from 'react'
import { GiftedChat, Message, Bubble, SystemMessage } from 'react-native-gifted-chat'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import base64 from 'react-native-base64';
import { Icon } from 'react-native-elements'



export default class Chat extends React.Component {

    state = {
        isLoggedIn: false,
        user: [],
        participant_id: 0,
        isRefreshing: true,
        messages: [],
        participants: [],
        chat_with_id: 0,
        token: null,
    }


    getData = async () => {
        let isLoggedIn = await AsyncStorage.getItem('user').then(item => {
            console.log(item);
            if (item !== null) {
                console.log(item)
                this.setState({ user: JSON.parse(item) })
            } else {
            }
        });
    }

    async componentDidMount() {
        const { p_id, username } = await this.props.route.params
        this.props.navigation.setOptions({
            headerTitle: username,
            headerTitleStyle: { fontSize: 16, color: 'white' },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="checkmark-done-outline" type="ionicon" size={20} color="white" />
                        <Icon name="person-outline" type="ionicon" size={20} color="white" style={{ marginLeft: 12, marginRight: 12 }} />
                    </View>
                )
            }
        })
        // this.getData()
        // await this.setState({ chat_with_id: chat_with_id });
        // const response = await getChatWithUser(this);
    }

    async formatMessages() {
        let msgs = this.state.messages
        await this.state.messages.forEach((value, index) => {
            msgs[index].user = JSON.parse(value.user);
        })
        this.setState({ messages: msgs });
    }

    async onSend(message: any) {
        // let formdata = new FormData()
        // formdata.append("text", base64.encode(message[0].text))
        // formdata.append("receiver_id", this.state.chat_with_id)
        // formdata.append("p_id", this.state.participants.length > 0 ? this.state.participants.participant_id : 0)
        // const response = await sendChatMessage(this, formdata);
        // if (response.status) {
        //     let res = response.response
        //     if (res.isMessageSent) {
        let messages = this.state.messages
        // messages.unshift({
        messages.push({
            '_id': 2,
            'text': 'some message',
            'sent': true,
            'user': {
                '_id': 1
            }
        })

        this.setState({ messages: messages });
        //     }
        // }

    }

    messageRender = (props) => {
        return (
            <Bubble
                {...props}

                textStyle={{
                    left: {
                        color: 'white'
                    },
                    right: {
                        color: 'black',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#7D4DFF',
                    },
                    right: {
                        backgroundColor: '#F6F6F6',
                    },
                }}
            />
        )
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: 'white' }}>
                <GiftedChat
                    messages={this.state.messages}
                    renderBubble={this.messageRender}
                    onSend={messages => this.onSend(messages)}
                    scrollToBottom={true}
                    user={{
                        _id: 1
                    }}
                />
            </View>
        )
    }
}