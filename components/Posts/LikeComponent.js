import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { post, _delete } from '../../apis/index'





export default class LikeComponent extends React.Component {

    // const [isLiked, setIsLiked] = useState(false)
    // const [likesCount, setLikesCount] = useState(0)
    // const [postt, setPostt] = useState([])
    // const [like, setLike] = useState([])

    state = {
        isLiked: false,
        likesCount: 0,
        postt: [],
        like: [],
        token: 'sometoken',
        user: []
    }

    componentDidMount() {
        this.setState({ postt: this.props.post, isLiked: this.props.isLiked, likesCount: this.props.post.likes_count })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.post != state.postt && props.post != undefined) {
            return {
                postt: props.post
            }
        }


        return null;
    }

    likePost = async () => {
        let form = new FormData();
        form.append("post_id", this.state.postt.post_id)
        let response = await post(this, 'like', form)
        // console.log(response)
        if (response.status) {
            let res = response.response
            if (res.isCreated) {
                console.log(res);

                this.setState({
                    isLiked: true,
                    like: res.like,
                    likesCount: this.state.likesCount + 1
                })

                // setIsLiked(true);
                // setLike(res.like)
                // setLikesCount(likesCount + 1)
                // console.log(isLiked)
                // console.log(res.isCreated)

            } else {
            }
        } else {
        }
    }

    unlike = async () => {
        let response = await _delete(this, `like/${this.state.postt.post_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isDeleted) {
                this.setState({
                    isLiked: false,
                    like: [],
                    likesCount: this.state.likesCount > 0 ? this.state.likesCount - 1 : 0
                })
            } else {
                alert(res.message);
            }
        } else {
        }
    }

    render() {

        return (
            <>
                {this.state.isLiked ? (
                    <TouchableOpacity onPress={() => this.unlike()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="heart" type="ionicon" size={20} color="red" style={{ alignSelf: 'center', marginLeft: 6 }} />
                        {this.state.likesCount > 0 &&
                            <Text>{this.state.likesCount}</Text>
                        }
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.likePost()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="heart-outline" type="ionicon" size={20} style={{ alignSelf: 'center', marginLeft: 6 }} />
                        {this.state.likesCount > 0 &&
                            <Text>{this.state.likesCount}</Text>
                        }

                    </TouchableOpacity>
                )}
            </>
        )
    }
}