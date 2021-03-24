import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Platform } from 'react-native';
import colors from '../constants/colors'
import { Badge } from 'react-native-elements'
const profile_image = require('../assets/images/default.png');

const data = [
    {
        id: '1',
        username: 'Irfan Irfi'
    },
    {
        id: '2',
        username: 'Irfan Irfi'
    },
    {
        id: '3',
        username: 'Irfan Irfi'
    },
    {
        id: '4',
        username: 'Irfan Irfi'
    },
]

export default class SinglePost extends React.Component {
    state = {
        participants: [],
        user: [],
        token: null,
        isLoggedIn: false,
        isRefreshing: false,
    }

    goToChat = (chat: any) => {
        var id = 0
        if (chat.i_am_intitiater == 1) {
            id = chat.chat_initiated_with_id
        } else {
            id = chat.chat_initiater_id
        }

        if (id > 0) {
            this.props.navigation.navigate('Chat', { chat_with_id: id });
        }
    }

    async componentDidMount() {
        // this.props.navigation.addListener('focus', () => {
        //     this.setState({ isRefreshing: true }, () => getChatParticipants(this))
        // })
        // await getChatParticipants(this);
    }

    onRefresh = async () => {
        await this.setState({ isRefreshing: true })
        await getChatParticipants(this);

    }

    getUserName(item: any) {
        if (item.i_am_intitiater == 1) {
            return item.initiated_with_username
        } else {
            return item.initiater_username
        }
    }

    getProfilePicture(item: any) {
        if (item.i_am_intitiater == 1) {
            return getProfileImage('user', item.initiated_with_profile_image)
        } else {
            return getProfileImage('user', item.initiater_profile_image)
        }
    }

    getLastMessage(item: any) {
        if (item.last_message.length > 0) {
            if (item.last_message.length > 15) {
                return item.last_message.substr(0, 15) + '...'
            } else {
                return item.last_message
            }
        } else {
            return ''
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <FlatList
                    style={{ width: '100%' }}
                    data={data}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefresh()}
                    keyExtractor={(item) => { return item.id; }}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1, shadowColor: 'black', shadowOpacity: 0.3, padding: 10, borderRadius: 2,
                            flexDirection: 'row', elevation: 3,
                            marginHorizontal: 8, marginVertical: 8,
                            borderColor: 'darkgray',
                            borderWidth: Platform.OS == "ios" ? 0.3 : 0
                        }}>

                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                                    <Image style={styles.image} source={profile_image} />
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                                <TouchableOpacity style={{ alignSelf: 'stretch' }}>
                                    <Text style={styles.title}>{item.username}</Text>
                                </TouchableOpacity>

                            </View>

                            {/* <View style={{
                                flexDirection: 'column',
                                alignContent: 'stretch'
                            }}>

                                <Badge value={item.unread_msgs} status="warning" containerStyle={{ alignSelf: 'flex-end' }} />
                            </View> */}

                        </View>
                    )
                    }
                />
            </View >
        );
    }

}


const styles = StyleSheet.create({

    image: {
        width: 80,
        height: 80,
        margin: 4,
        borderRadius: 120

    },

    title: {
        fontSize: 15,
        color: "#000",
        fontWeight: 'bold',
        marginTop: 20,
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
