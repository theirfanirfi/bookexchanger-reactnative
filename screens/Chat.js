import React from 'react'
import { GiftedChat, Message, Bubble, SystemMessage } from 'react-native-gifted-chat'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Row, Col } from 'react-native-easy-grid'
import base64 from 'react-native-base64';
import { Icon, Card, Button } from 'react-native-elements'
import { get, post, put } from '../apis/index'
import ChatBookExchangeComponent from '../components/ChatExchangeComponent';



export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        // this.context = this;
    }

    state = {
        isLoggedIn: false,
        user: [],
        participant_id: 0,
        isRefreshing: true,
        messages: [],
        participants: [],
        chat_with_id: 0,
        token: 'sometoken',
        username: null,
        sender_id: 0,
        is_approved: false,
        is_decline: false,
        context: this
    }


    approve_exchange_request = async () => {
        let form = new FormData();
        let response = await post(this, `exchange/approve_exchange/${this.state.participant_id}`, form)
        if (response.status) {
            let res = response.response
            if (res.messages.length > 0) {
                this.setState({ messages: res.messages, message: 'No notification for you at the moment' }, () => {
                    this.setState({ sender_id: this.getSender()._id }, () => this.formatMessages())
                });
            } else {
                // return false;
            }
        } else {
            // return false;
        }
    }

    async getMessages() {
        let response = await get(this, `messages/${this.state.participant_id}`)
        if (response.status) {
            let res = response.response
            if (res.messages.length > 0) {
                this.setState({ messages: res.messages, message: 'No notification for you at the moment' }, () => {
                    this.setState({ sender_id: this.getSender()._id }, () => this.formatMessages())
                });
            } else {
                // return false;
            }
        } else {
            // return false;
        }
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
        this.setState({ participant_id: p_id, username: username, isLoading: true }, () => this.getMessages());

        // this.getData()
        // await this.setState({ chat_with_id: chat_with_id });
        // const response = await getChatWithUser(this);
    }

    async formatMessages() {
        let msgs = this.state.messages
        await this.state.messages.forEach((value, index) => {
            msgs[index].user = JSON.parse(value.user);
        })
        this.setState({ messages: msgs, isLoading: false });
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
        messages.unshift({
            // messages.push({
            '_id': '8783-djfls-fjsdl-2',
            'text': 'some message',
            'sent': true,
            'user': {
                '_id': this.state.sender_id
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

    getSender() {
        let message = this.state.messages[0]
        if (message.amISender == 1) {
            return JSON.parse(message.sender);
        } else {
            return JSON.parse(message.receiver);
        }
    }
    customMessage = (message) => {
        // console.log(message.currentMessage)
        if (message.currentMessage.is_exchange == 1) {
            // let book_to_be_received = JSON.parse(message.currentMessage.book_to_be_received)
            // let book_to_be_sent = JSON.parse(message.currentMessage.book_to_be_sent)
            return <ChatBookExchangeComponent
                book_to_be_received={message.currentMessage.book_to_be_received}
                book_to_be_sent={message.currentMessage.book_to_be_sent}
                exchange_id={message.currentMessage.exchange_id}
                context={this}
            />
        }
        return <Message {...message} />
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: 'white' }}>
                <GiftedChat
                    renderLoading={() => {
                        return <ActivityIndicator size="large" />

                    }
                    }
                    isLoadingEarlier={true}
                    messages={this.state.messages}
                    renderBubble={this.messageRender}
                    renderMessage={this.customMessage}
                    onSend={messages => this.onSend(messages)}
                    scrollToBottom={true}
                    user={{
                        _id: this.state.sender_id
                    }}
                />
            </View>
        )
    }
}