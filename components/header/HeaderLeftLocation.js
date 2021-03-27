import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Input, Icon } from 'react-native-elements'



export default function HeaderLeftLocation({ nav, navigator }) {
    return (
        <TouchableOpacity style={{ flex: 1, flexDirection: 'column', marginLeft: 12, marginTop: 12 }}
            onPress={() => navigator.navigation.navigate('location')}>
            <Text style={{ color: '#fff', fontSize: 13, marginLeft: 4 }}>Nearby Books</Text>
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Icon name="room" type="material" color="white" size={17} />
                <Text style={{ color: '#fff', fontSize: 15 }}>Your Location</Text>

            </View>
            {/* <Input
                placeholder="Your location"
                containerStyle={{ height: 10, top: -12 }}
                inputStyle={{ color: '#fff' }}
                placeholderTextColor="white"
                leftIcon={{ type: 'material', name: 'room', color: '#fff', size: 18 }}

            /> */}
        </TouchableOpacity>
    )
}