import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import { post, _delete, encode } from '../../apis/index'
const windowHeight = Dimensions.get('window').height;
// import CommentsComponent from './CommentsComponent'


export default class CommentWritingBoxComponent extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        comment: null,
        commentError: null,
        postt: []
    }

    componentDidMount() {
        this.setState({
            postt: this.props.post
        })
    }

    postComment = async () => {
        let form = new FormData();
        form.append("post_id", encode(this.state.postt.post_id.toString()));
        form.append("comment_text", encode(this.state.comment));
        let response = await post(this, 'comment', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                this.setState({ comment: null })
                this.props.commentCallBack(this.props.context, res.comment);

            } else {
                this.setState({ commentError: res.message })

            }
        } else {
            this.setState({ commentError: "Error occurred. Please try again." })
        }

    }
    render() {
        return (
            <View>
                <Input
                    errorMessage={this.state.commentError}
                    multiline={true}
                    placeholder="Write your comment"
                    value={this.state.comment}
                    onChangeText={(text) => this.setState({ comment: text == "" ? null : text })}
                    rightIcon={
                        <TouchableOpacity onPress={() => this.postComment()}>
                            <Icon name="send" type="ionicon" color="green" />

                        </TouchableOpacity>
                    } />
            </View>
        )
    }

}