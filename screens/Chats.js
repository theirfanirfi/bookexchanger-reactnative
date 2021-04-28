import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Platform } from 'react-native';
import colors from '../constants/colors'
import { Badge } from 'react-native-elements'
const profile_image = require('../assets/images/default.png');
import { get } from '../apis/index'

export default class Chats extends React.Component {
    state = {
        participants: [],
        user: [],
        token: 'sometoken',
        isLoggedIn: false,
        isRefreshing: false,
    }

    async getChats() {
        this.setState({ isRefreshing: true, message: 'loading...' });
        let response = await get(this, 'participant/')
        if (response.status) {
            let res = response.response
            if (res.isFound) {
                this.setState({ participants: res.participants, isRefreshing: false, message: 'No chats' });

            } else {
                // return false;
                this.setState({ isRefreshing: false, message: 'No chats' })
            }
        } else {
            // return false;
            this.setState({ isRefreshing: false, message: 'No chats' })

        }
    }


    async componentDidMount() {
        // this.props.navigation.addListener('focus', () => {
        //     this.setState({ isRefreshing: true }, () => getChatParticipants(this))
        // })
        // await getChatParticipants(this);
        this.getChats();
    }

    onRefresh = async () => {
        this.setState({ isRefreshing: true }, () => this.getChats())

    }

    navigateToUserProfile = (chat) => {
        let user_id = chat.amIUserOne == 1 ? JSON.parse(chat.user_two).user_two_id : JSON.parse(chat.user_one).user_one_id
        this.props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: user_id } })
    }

    getProfilePicture(item: any) {
        if (item.i_am_intitiater == 1) {
            return getProfileImage('user', item.initiated_with_profile_image)
        } else {
            return getProfileImage('user', item.initiater_profile_image)
        }
    }

    getUserName = (item) => {
        let user = undefined
        if (item.amIUserOne == 1) {
            user = JSON.parse(item.user_two)
            return user.user_two_fullname
        } else {
            user = JSON.parse(item.user_one)
            return user.user_one_fullname
        }
    }

    getChatWithUserId = (chat) => {
        return chat.amIUserOne == 1 ? JSON.parse(chat.user_two).user_two_id : JSON.parse(chat.user_one).user_one_id
    }



    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.state.participants}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefresh()}
                    keyExtractor={(item) => { return item.id; }}
                    renderItem={({ item }) => {
                        return (

                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Chat', { 'p_id': item.p_id, 'username': this.getUserName(item), 'chat_with': this.getChatWithUserId(item) })} style={{
                                    flex: 1, padding: 10,
                                    flexDirection: 'row',
                                }}  >

                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-start' }}
                                        onPress={() => this.navigateToUserProfile(item)}>
                                        <Image style={styles.image} source={profile_image} />
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                    <TouchableOpacity style={{ alignSelf: 'stretch' }} onPress={() => this.props.navigation.navigate('Chat', { 'p_id': item.p_id, 'username': this.getUserName(item), 'chat_with': this.getChatWithUserId(item) })}>
                                        <Text style={styles.title}>{this.getUserName(item)}</Text>
                                    </TouchableOpacity>

                                </View>

                                {/* <View style={{
                                flexDirection: 'column',
                                alignContent: 'stretch'
                            }}>

                                <Badge value={item.unread_msgs} status="warning" containerStyle={{ alignSelf: 'flex-end' }} />
                            </View> */}

                            </TouchableOpacity>
                        )
                    }
                    }
                />
            </View >
        );
    }

}


const styles = StyleSheet.create({

    image: {
        width: 50,
        height: 50,
        margin: 4,
        borderRadius: 50

    },

    title: {
        fontSize: 14,
        color: "#000",
        fontFamily: 'Roboto-Regular',
        marginTop: 16,
    },
    description: {
        fontSize: 15,
        color: "#fff",
        marginBottom: 8
    },

    icon: {
        width: 20,
        height: 20,
    },
    view: {
        backgroundColor: "#eee",
    },
    profile: {
        backgroundColor: "#1E90FF",
    },
    message: {
        backgroundColor: "#228B22",
    },
});
