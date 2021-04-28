import React, { useState, useEffect, Component } from 'react'
import { get } from '../../apis/index'
import { Icon, Button } from 'react-native-elements'

export default class FollowButton extends Component {

    state = {
        isFollowed: false,
        user_id: 0,
        token: 'sometoken',
        user: []
    }

    componentDidMount() {
        const { is_followed, user_id } = this.props
        this.setState({ isFollowed: is_followed, user_id: user_id })

    }

    static getDerivedStateFromProps(props, state) {
        if (state.user_id != props.user_id && props.user_id != undefined) {
            return {
                user_id: props.user_id,
                isFollowed: props.is_followed,
            }
        }
        return null;
    }

    follow = async () => {
        let response = await get(this, `follow/${this.props.user_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isLoggedIn && res.isFollowed) {
                this.setState({ isFollowed: true })
                this.props.followActionCallBack(this.props.context, 'follow');
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }
    }

    unfollow = async () => {
        let response = await get(this, `follow/unfollow/${this.props.user_id}/`)
        if (response.status) {
            let res = response.response
            if (res.isLoggedIn && res.isUnFollowed) {
                this.setState({ isFollowed: false })
                this.props.followActionCallBack(this.props.context, 'unfollow');


            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }
    }
    render() {
        return (
            <>
                {this.state.isFollowed ? (
                    <Button
                        buttonStyle={{ backgroundColor: '#41cece' }}
                        containerStyle={{ width: '60%', alignSelf: 'center', height: 50 }
                        }
                        onPress={() => this.unfollow()}
                        title="Unfollow" />
                ) : (
                    <Button
                        buttonStyle={{ backgroundColor: '#41cece' }}
                        containerStyle={{ width: '60%', alignSelf: 'center', height: 50 }
                        }
                        onPress={() => this.follow()}

                        icon={< Icon color="white" name="add" type="ionicon" />}
                        title="Follow" />
                )}
            </>
        )
    }
}
