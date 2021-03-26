import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



export default function HeaderLeftLocation({ nav, navigator }) {
    return (
        <>
            <Text style={{ color: '#fff', fontSize: 12, position: 'absolute', top: 8, left: 14 }}>Nearby Books</Text>
            <Input
                placeholder="Your location"
                containerStyle={{ height: 10, top: -12 }}
                inputStyle={{ color: '#fff' }}
                placeholderTextColor="white"
                leftIcon={{ type: 'material', name: 'room', color: '#fff', size: 18 }}

            />
        </>
    )
}