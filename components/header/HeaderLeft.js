import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import CircularImage from '../Images/CircularImage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



export default function HeaderLeft({ nav, navigator }) {
    if (!nav.canGoBack) {
        return (
            <CircularImage image={null}
                style={null}
                size="small"
            />
        )
    } else {
        return (
            <TouchableOpacity onPress={() => navigator.navigation.pop()}>
                <Icon name="arrow-left" color="black" size={25} />
            </TouchableOpacity>
        )
    }
}