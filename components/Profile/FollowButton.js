import React, { useState, useEffect } from 'react'
import { get } from '../../apis/index'
import { Icon, Button } from 'react-native-elements'

export default function FollowButton(props) {

    const [followed, setFollowed] = useState(false)
    const [userId, setUserId] = useState(0)

    useEffect(() => {
        setUserId(props.user_id)
        setFollowed(props.is_followed)
        console.log("is followed: " + props.is_followed)
    })

    const follow = async () => {
        let response = await get(props.context, `follow/${userId}/`)
        if (response.status) {
            let res = response.response
            if (res.isLoggedIn && res.isFollowed) {
                setFollowed(true);
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }
    }

    const unfollow = async () => {
        let response = await get(props.context, `follow/unfollow/${userId}/`)
        if (response.status) {
            let res = response.response
            if (res.isLoggedIn && res.isUnFollowed) {
                setFollowed(false);
            } else {
                alert(res.message);
            }
        } else {
            // return false;
        }
    }

    return (
        <>
            {followed ? (
                <Button
                    buttonStyle={{ backgroundColor: '#41cece' }}
                    containerStyle={{ width: '60%', alignSelf: 'center', height: 50 }
                    }
                    onPress={() => unfollow()}
                    title="Unfollow" />
            ) : (
                <Button
                    buttonStyle={{ backgroundColor: '#41cece' }}
                    containerStyle={{ width: '60%', alignSelf: 'center', height: 50 }
                    }
                    onPress={() => follow()}

                    icon={< Icon color="white" name="add" type="ionicon" />}
                    title="Follow" />
            )}
        </>
    )
}
