import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native'
const logo = require('../assets/graphics/logo.png')

export default function SplashScreen(props) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'root', screen: 'Home' }]
            });
        }, 5000)
    })
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Image source={logo} style={{ alignSelf: 'center', width: 300, height: 300 }} />
        </View>
    )
}