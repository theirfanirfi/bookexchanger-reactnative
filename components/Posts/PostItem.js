/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Col, Row } from "react-native-easy-grid";
import { Card, Icon } from 'react-native-elements'
import CircularImage from '../Images/CircularImage';
import { getMoment, getImage } from '../utils'
const profile_default_image = require('../../assets/images/default.png');
import LikeComponent from './LikeComponent'
import CommentComponent from './CommentComponent'
import WebView from 'react-native-webview';
import { get } from '../../apis/index'



export default function PostItem(props) {
    let post = props.post
    let actions = props.actions ? true : false
    const navigateToUserProfile = () => {
        props.navigation.navigate('profile', { screen: 'profile', params: { isMe: false, user_id: post.user_id } })
    }
    const delete_post = async () => {
        const del_post = await get(props.context, `post/delete_post/${post.post_id}/`);
        if (del_post.response.isDeleted) {
            alert('Post Deleted');
        } else {
            alert('Error occurred. Please try again.');
        }
    }

    return (
        <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('SinglePost', { screen: 'post', params: { post_id: post.post_id } })}>

                <Row>
                    <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                        <TouchableOpacity onPress={() => navigateToUserProfile()}>

                            <CircularImage style={null} image={post.profile_image} size="small" />
                        </TouchableOpacity>
                        <Row style={{ flexDirection: 'column' }}>
                            <TouchableOpacity onPress={() => navigateToUserProfile()}>

                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{post.fullname}</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{post.created_at}</Text>

                        </Row>


                    </Col>

                    {actions &&
                        <Col style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('editpost', { post_id: post.post_id })}>
                                <Text style={{ alignSelf: 'flex-end' }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => delete_post()}>
                                <Text style={{ alignSelf: 'flex-end' }}>Delete</Text>
                            </TouchableOpacity>
                        </Col>
                    }

                </Row>

                <Row>
                    <Col>
                        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', margin: 6 }}>{post.post_title}</Text>
                    </Col>

                </Row>
                {post.post_image != "" && post.post_image != null &&
                    <Row>
                        <Col>
                            <Image style={{ width: '100%', height: 200 }} source={{ uri: getImage('posts', post.post_image) }} />
                        </Col>
                    </Row>
                }



                <Row>
                    <Col>
                        {/* <Text style={{
                            textAlign: 'justify', fontSize: 14,
                            color: 'gray',
                            fontFamily: 'Roboto-Regular', margin: 6
                        }}>{post.post_description.length > 100 ? post.post_description.substr(0, 100) + '...' : post.post_description}</Text> */}
                        <WebView style={{ height: 100, width: '100%', }} source={{
                            html: `<style> *{font-size:44px;}  </style> 
                        ${post.post_description.length > 100 ? post.post_description.substr(0, 100) + '...' : post.post_description} `
                        }} />
                    </Col>
                </Row>




                <Row style={{ marginTop: 18 }}>
                    <Col >
                        <LikeComponent post={post} context={props.context} isLiked={post.isLiked} />
                    </Col>
                    <Col>
                        {/* <TouchableOpacity>
                        <Icon name="chatbox-ellipses-outline" type="ionicon" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                    </TouchableOpacity> */}
                    </Col>
                    <Col>
                        {/* <Text style={{ margin: 6, color: 'gray' }}>{"2020-12-04"}</Text> */}
                        {/* <CommentComponent navigation={props.navigation} context={props.context} post={post} /> */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={() => props.navigation.navigate('SinglePost', { screen: 'post', params: { post_id: post.post_id } })}>
                            <Icon name="chatbox-ellipses-outline" type="ionicon" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                            {post.comments_count > 0 &&
                                <Text style={{ fontSize: 17 }}> {post.comments_count}</Text>
                            }
                        </TouchableOpacity>

                    </Col>

                </Row>
            </TouchableOpacity>
        </Card>
    )
}