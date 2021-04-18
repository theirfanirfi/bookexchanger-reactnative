import React from 'react'
import { GiftedChat, Message, Bubble, SystemMessage } from 'react-native-gifted-chat'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Row, Col } from 'react-native-easy-grid'
import base64 from 'react-native-base64';
import { Icon, Card, Button } from 'react-native-elements'
import { get, post, put, encode } from '../apis/index'
import ChatBookExchangeComponent from '../components/ChatExchangeComponent';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';



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
        context: ThemedListItem,
        message: ''
    }


    approve_exchange_request = async () => {
        let form = new FormData();
        let response = await post(this, `exchange/approve_exchange/${this.state.participant_id}`, form)
        if (response.status) {
            let res = response.response
            if (res.messages.length > 0) {
                let msgs = await this.formatMessages(res.messages);
                this.setState({ messages: msgs, message: 'No chat' }, () => {
                    this.setState({ sender_id: this.getSender()._id })
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
                let messages = res.messages
                await messages.forEach((value, index) => {
                    messages[index].user = JSON.parse(value.user);
                })
                this.setState({ messages: messages, message: 'No chat' });
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

    async formatMessages(messages) {
        let msgs = await messages
        await msgs.forEach((value, index) => {
            msgs[index].user = JSON.parse(value.user);
        })
        return msgs;
        // this.setState({ messages: msgs, isLoading: false });
    }

    async onSend(message) {
        let formdata = new FormData()
        formdata.append("text", encode(message[0].text))
        const response = await post(this, `messages/send/${this.state.participant_id}`, formdata);
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                let messages = this.state.messages
                messages.unshift({
                    // messages.push({
                    '_id': res.messages.message_id,
                    'text': message[0].text,
                    'sent': true,
                    'user': {
                        '_id': res.messages.sender_id
                    }
                })

                this.setState({ messages: messages });
            } else {
                alert('Unable to send. Please try again.')
            }
        }

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
                        backgroundColor: '#41cece',
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
        return message.user;
    }

    customMessage = (message) => {
        if (message.currentMessage.is_exchange == 1) {
            // let book_to_be_received = JSON.parse(message.currentMessage.book_to_be_received)
            // let book_to_be_sent = JSON.parse(message.currentMessage.book_to_be_sent)
            return <ChatBookExchangeComponent
                book_to_be_received={message.currentMessage.book_to_be_received}
                book_to_be_sent={message.currentMessage.book_to_be_sent}
                exchange_id={message.currentMessage.exchange_id}
                is_approved={message.currentMessage.is_exchange_confirmed}
                is_declined={message.currentMessage.is_exchange_declined}
                context={this}
            />
        } else {
            return <Message {...message} />
        }
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: 'white' }}>
                <GiftedChat
                    // isLoadingEarlier={true} 
                    messages={this.state.messages}
                    renderBubble={this.messageRender}
                    renderMessage={this.customMessage}
                    onSend={messages => this.onSend(messages)}
                    scrollToBottom={true}
                    user={{
                        _id: "1"
                    }}
                />
            </View>
        )
    }
}