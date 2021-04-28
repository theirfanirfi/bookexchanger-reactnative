import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native'
const logo = require('../assets/graphics/logo.png')
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
    const isLoggedIn = async () => {
        try {
            const value = await AsyncStorage.getItem('user')
            if (value !== null) {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'root', screen: 'Home' }]

                });
            } else {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'auth', screen: 'login' }]
                });
            }
        } catch (e) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'auth', screen: 'login' }]
            });
        }
    }

    // const isLoggedIn = () => {
    //     if (getData()) {
    //         props.navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'root', screen: 'Home' }]
    //         });
    //     } else {
    //         props.navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'auth', screen: 'login' }]
    //         });
    //     }
    // }

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn()
        }, 5000)
    })
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Image source={logo} style={{ alignSelf: 'center', width: 300, height: 300 }} />
        </View>
    )
}