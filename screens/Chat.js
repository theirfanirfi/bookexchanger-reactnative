import React from 'react'
import { GiftedChat, Message, Bubble, SystemMessage } from 'react-native-gifted-chat'
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Card, Button } from 'react-native-elements'
import { get, post, put, encode } from '../apis/index'
import ChatBookExchangeComponent from '../components/ChatExchangeComponent';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';
import ChatExchangeComponentForSender from '../components/ChatExchangeComponentForSender';
import { convertUTCDateToLocalDate } from '../components/utils'



export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.intervalId = null;
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
        message: '',
        chat_with: null
        // intervalId: null,
    }

    getLoggedInUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                let user = JSON.parse(value);
                this.setState({ user: user });
            }
        } catch (e) {

        }
    }


    approve_exchange_request = async () => {
        let form = new FormData();
        let response = await post(this, `exchange/approve_exchange/${this.state.participant_id}/`, form)
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
        if (this.intervalId == null) {
            return;
        }

        console.log('part id: ' + this.state.participant_id)
        let response = await get(this, `messages/${this.state.participant_id}/`)

        if (response.status) {
            let res = response.response
            console.log('exchange with: ' + res.messages[0].to_exchange_with_user_id)
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

    navigateToUserProfile = () => {
        this.props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: this.state.chat_with } })
    }


    async componentDidMount() {
        const { p_id, username, chat_with } = await this.props.route.params
        await this.getLoggedInUser();
        console.log("p_id: " + p_id)
        console.log("chat_with " + chat_with)
        console.log("user id " + this.state.user.user_id)
        this.props.navigation.setOptions({
            headerTitle: username,
            headerTitleStyle: { fontSize: 16, color: 'white' },
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Icon name="checkmark-done-outline" type="ionicon" size={20} color="white" /> */}
                        <TouchableOpacity onPress={() => this.navigateToUserProfile()}>

                            <Icon name="person-outline" type="ionicon" size={20} color="white" style={{ marginLeft: 12, marginRight: 12 }} />
                        </TouchableOpacity>
                    </View>
                )
            }
        });
        // this.getMessages();

        this.intervalId = 0;
        this.setState({ participant_id: p_id, username: username, isLoading: true, chat_with: chat_with }, () => this.getMessages());
        this.intervalId = setInterval(() => this.getMessages(), 30000);

        // this.getData()
        // await this.setState({ chat_with_id: chat_with_id });
        // const response = await getChatWithUser(this);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        this.intervalId = null;
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
        let msg = message.currentMessage
        if (msg.is_exchange == 1) {
            // let book_to_be_received = JSON.parse(message.currentMessage.book_to_be_received)
            // let book_to_be_sent = JSON.parse(message.currentMessage.book_to_be_sent)
            if (msg.to_exchange_with_user_id != this.state.user.user_id) {
                return <ChatExchangeComponentForSender
                    book_to_be_received={message.currentMessage.book_to_be_received}
                    book_to_be_sent={message.currentMessage.book_to_be_sent}
                    exchange_id={message.currentMessage.exchange_id}
                    is_approved={message.currentMessage.is_exchange_confirmed}
                    is_declined={message.currentMessage.is_exchange_declined}
                    context={this} />
            } else {
                //for the exchang request receiver, the book to be sent will be book to be received
                return <ChatBookExchangeComponent
                    book_to_be_received={message.currentMessage.book_to_be_sent}
                    book_to_be_sent={message.currentMessage.book_to_be_received}
                    exchange_id={message.currentMessage.exchange_id}
                    is_approved={message.currentMessage.is_exchange_confirmed}
                    is_declined={message.currentMessage.is_exchange_declined}
                    context={this}
                />
            }
        } else {
            return <Message {...message} />
        }
    }

    renderTimee(msg) {
        let message = msg.currentMessage
        let d = message.createdAt.replace(" ", "T")
        let date = new Date(d)
        let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        let offset = date.getTimezoneOffset() / 60;
        let hours = date.getHours();

        newDate.setHours(hours - offset);
        let strDate = "";
        let amPm = "pm";

        let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

        if (hours > 12) {
            strDate = "0" + (hours - 12) + ":" + minutes + " pm"
        } else {
            hours < 10 ? strDate = "0" + hours : strDate = hours
            strDate += ":" + minutes + " am"
        }


        return (
            <View style={{ margin: 4 }}>

                <Text style={{ color: 'gray', fontSize: 8 }}>{message.createdAt.substr(0, 10)}</Text>
                <Text style={{ color: 'gray', fontSize: 10 }}>{strDate}</Text>
            </View>
        )
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
                    renderTime={this.renderTimee}
                    user={{
                        _id: this.state.user.user_id
                    }}
                />
            </View>
        )
    }
}