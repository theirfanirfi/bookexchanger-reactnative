/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Text, View, FlatList, RefreshControl, Image } from 'react-native';
import colors from '../../constants/colors'
import PostItem from '../Posts/PostItem'
import { get, post, _delete } from '../../apis/index'
const noposts = require('../../assets/graphics/nouserpost.png');
export default class SocialTab extends React.Component {
    state = {
        token: 'sometoken',
        posts: [],
        user: [],
        refreshing: false,
        profile_id: "me",
    }

    async getPosts() {
        this.setState({ refreshing: true });
        let response = await get(this, `post/posts/${this.state.profile_id}/`)
        if (response.status) {
            let res = response.response

            if (res.posts.length > 0) {
                this.setState({ posts: res.posts, refreshing: false });

            } else {
                // return false;
            }
        } else {
            // return false;
        }
    }

    componentDidMount() {
        const { profile_id } = this.props
        this.setState({ profile_id: profile_id }, () => {
            this.getPosts();
        });

        this.props.navigation.addListener('focus', async () => {
            this.setState({ refreshing: true }, () => this.getPosts())
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (state.profile_id != props.profile_id && props.profile_id != undefined) {
            return {
                profile_id: props.profile_id
            }
        }
        return null;
    }
    render() {
        if (this.state.posts.length > 0) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>

                    <FlatList
                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.getPosts()} />
                        }
                        data={this.state.posts}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <PostItem actions={true} key={item.id} context={this} post={item} navigation={this.props.navigation} />}

                    />
                </View>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
                    <Image source={noposts} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                    <Text style={{ alignSelf: 'center' }}>No Posts</Text>
                </View>
            )
        }
    }
}
