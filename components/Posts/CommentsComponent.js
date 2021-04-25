import React from 'react';
import { Image, Text, TouchableOpacity, Dimensions, FlatList, View } from 'react-native'
import { Icon, Card } from 'react-native-elements'
import { post, _delete, get } from '../../apis/index'
import { getImage } from '../utils'
import CircularImage from '../Images/CircularImage'
import { Grid, Row, Col } from 'react-native-easy-grid'
import CommentWritingBoxComponent from './CommentWritingBoxComponent'

export default class CommentsComponent extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        postt: [],
        comments: [],
        visible: false
    }

    commentCallBack(context, comment) {
        let comments = context.state.comments
        comments.push(comment);
        context.setState({ comments: comments })
        console.log(context.state.comments)
    }

    async componentDidMount() {
        this.setState({ postt: this.props.postt });

        let response = await get(this, `comment/${this.state.postt.post_id}/`)
        console.log(response);

        if (response.status) {
            let res = response.response
            if (res.isFetched) {
                this.setState({ comments: res.comments });
            } else {
                // return false;
            }
        } else {
            // return false;
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.postt != props.postt && props.postt != undefined) {
            console.log(props.postt)
            return {
                postt: props.postt
            }
        }
        return null
    }

    navigateToUserProfile = () => {
        this.props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: this.state.postt.user_id } })
    }

    listHeader = () => {
        return <CommentWritingBoxComponent commentCallBack={this.commentCallBack} context={this} post={this.state.postt} />

    }

    render() {
        return (
            <FlatList
                style={{ backgroundColor: '#fff' }}
                data={this.state.comments}
                keyExtractor={(item) => {
                    return item.comment_id;
                }}
                ListHeaderComponent={this.listHeader}
                renderItem={(item) => {
                    const comment = item.item
                    return (
                        <TouchableOpacity
                            onPress={() => this.navigateToUserProfile()}
                            style={{ borderBottomWidth: 0.5, borderBottomColor: 'lightgray', padding: 12, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>

                                <CircularImage style={null} image={getImage('profile', comment.profile_image)} size="small" />

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{comment.fullname}</Text>

                            </View>
                            <View>

                                <Text style={{ marginHorizontal: 12, textAlign: 'justify' }}>{comment.comment_text}</Text>

                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }

}