import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Input, Icon } from 'react-native-elements'



export default function AppSearchHeader(navigator) {
    let search_term = undefined;
    return {
        headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: () => {
            return <Input placeholder="Search"
                onChangeText={(text) => text == '' ? search_term = undefined : search_term = text}
                inputStyle={{ color: 'white' }}
                inputContainerStyle={{ borderBottomWidth: 0.45, borderBottomColor: 'white', top: 4 }}
                containerStyle={{ borderWidth: 0, top: 8 }} />
        }, headerTintColor: 'white',

        headerRight: () => {
            return (
                <TouchableOpacity onPress={() => navigator.navigation.navigate('search', { screen: 'search-app', params: { term: search_term } })}>
                    <Icon name="search-outline" type="ionicon" color="white" size={28} style={{ marginHorizontal: 12 }} />
                </TouchableOpacity>
            )
        }
    }
}