import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Image, Platform, Dimensions } from 'react-native';
import colors from '../constants/colors'
import { Col, Row } from "react-native-easy-grid";
import CircularImage from '../components/Images/CircularImage'
import { Badge, Card } from 'react-native-elements'
import LikeComponent from '../components/Posts/LikeComponent'
import CommentComponent from '../components/Posts/CommentComponent'
import CommentsComponent from '../components/Posts/CommentsComponent'
const profile_image = require('../assets/images/default.png');
import { get } from '../apis/index'
import { getImage } from '../components/utils'
import WebView from 'react-native-webview';

import AutoHeightWebView from 'react-native-autoheight-webview';

const webViewScript = `
  setTimeout(function() { 
    window.postMessage(document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export default class SinglePost extends React.Component {
    state = {
        post: [],
        user: [],
        token: 'sometoken',
        isLoggedIn: false,
        isRefreshing: false,
        message: 'Post not found',
        post_id: null
    }

    async getPost() {
        this.setState({ isRefreshing: true, message: 'loading...' });
        let response = await get(this, `post/${this.state.post_id}/`)
        if (response.status) {
            let res = response.response
            if (res.post.length > 0) {
                console.log(res)

                this.setState({ post: res.post[0], isRefreshing: false, message: 'Post not found' });

            } else {
                // return false;
            }
        } else {
            // return false;
        }
    }

    componentDidMount() {
        const { post_id } = this.props.route.params
        this.setState({ post_id: post_id }, () => this.getPost())
    }

    onRefresh = async () => {
        this.setState({ isRefreshing: true }, () => this.getPost())

    }



    render() {
        let post = this.state.post
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Card containerStyle={{ borderWidth: 0.4, borderColor: 'white', margin: 2 }}>
                    <Row>
                        <Col style={{ flexDirection: 'row', marginVertical: 8 }}>
                            <CircularImage style={null} image={post.profile_image} size="small" />
                            <Row style={{ flexDirection: 'column' }}>
                                <Text style={{ margin: 6, fontSize: 16, fontFamily: 'Roboto-Medium', }}>{post.fullname}</Text>
                                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 8 }}>{post.created_at}</Text>

                            </Row>


                        </Col>

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
                        <Col style={{ minHeight: 400, }}>
                            {/* <Text style={{
                                textAlign: 'justify', fontSize: 14,
                                color: 'gray',
                                fontFamily: 'Roboto-Regular', margin: 6
                            }}>{post.post_description}</Text> */}

                            {/* <WebView style={{ minHeight: 100, width: '100%', }}
                                    source={{
                                        html: `<style> * {font-size:44px;}  </style> ${post.post_description}`
                                    }} /> */}

                            <AutoHeightWebView
                                style={{ width: Dimensions.get('window').width - 15, marginTop: 35, minHeight: 250, maxHeight: 350 }}
                                customScript={webViewScript}
                                customStyle={` * {
        font-family: 'Times New Roman';
      }
      p {
        font-size: 16px;
      }
    `}
                                // injectedJavaScript={customScript}
                                onSizeUpdated={size => console.log(size.height)}
                                files={[{
                                    href: 'cssfileaddress',
                                    type: 'text/css',
                                    rel: 'stylesheet'
                                }]}
                                source={{
                                    html: `${post.post_description}`
                                }}
                                scalesPageToFit={true}
                                viewportContent={'width=device-width, user-scalable=no'}
                            /*
                            other react-native-webview props
                            */
                            />
                        </Col>
                    </Row>




                    <Row style={{ marginTop: 18 }}>
                        <Col >
                            <LikeComponent post={post} context={this} isLiked={post.isLiked} />
                        </Col>
                        <Col>
                            {/* <TouchableOpacity>
                        <Icon name="chatbox-ellipses-outline" type="ionicon" size={23} style={{ alignSelf: 'center', marginLeft: 26, marginBottom: 3 }} />
                    </TouchableOpacity> */}
                        </Col>
                        <Col>
                            {/* <Text style={{ margin: 6, color: 'gray' }}>{"2020-12-04"}</Text> */}
                            <CommentComponent context={this} post={post} />

                        </Col>

                    </Row>
                </Card>

                <Card>
                    <CommentsComponent navigation={this.props.navigation} postt={post} post_id={post.post_id} />
                </Card>
            </ScrollView >
        );
    }

}

