import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function HeaderRight({ nav, navigator }) {
    return (
        <TouchableOpacity onPress={() => console.log('search is active')}>
            <Icon name="search" color="black" size={25} />
        </TouchableOpacity>
    )
}