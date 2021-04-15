import React from 'react';
import { Image, Text, TouchableOpacity, Dimensions, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'
import Modal from 'react-native-modal';
const windowHeight = Dimensions.get('window').height;
import CommentsComponent from './CommentsComponent'
import CommentWritingBoxComponent from './CommentWritingBoxComponent'


export default class CommentComponent extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        comments: [],
        visible: false
    }

    commentCallBack(context, comment) {
        let comments = context.state.comments
        comments.push(comment);
        context.setState({ comments: comments })
        console.log(context.state.comments)
    }

    render() {
        return (


            <View>
                <Modal onBackButtonPress={() => this.setState({ visible: false })} isVisible={this.state.visible} deviceHeight={windowHeight - 20} swipeDirection={['down']} onSwipeComplete={() => { this.setState({ visible: false }) }}>
                    {/* <View style={{ backgroundColor: '#fff', marginTop: 30, padding: 12 }}> */}
                    {/* <CommentWritingBoxComponent commentCallBack={this.commentCallBack} context={this} post={this.props.post} /> */}
                    <CommentsComponent postt={this.props.post} />
                    {/* </View> */}
                </Modal>

                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => this.setState({ visible: true })}
                >
                    <Icon name="chatbox-ellipses-outline" type="ionicon" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                    {this.props.post.comments_count > 0 &&
                        <Text style={{ fontSize: 17 }}> {this.props.post.comments_count}</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }

}