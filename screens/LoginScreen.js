import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native'
const logo = require('../assets/graphics/logo.png')
import { SocialIcon } from 'react-native-elements'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

export default function LoginScreen(props) {



    useEffect(() => {
        setTimeout(() => {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'root', screen: 'Home' }]
            });
        }, 5000)

        GoogleSignin.configure({
            webClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com',
            iosClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com',

            // webClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com'
        })


    })

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            // this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    return (
        <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
            <Image source={logo} style={{ alignSelf: 'center', width: 200, height: 200 }} />
            <View style={{ margin: 30 }}>
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    raised
                    type='facebook'
                />


                <SocialIcon
                    title='Sign In With Google'
                    button
                    raised
                    onPress={() => signIn()}
                    type='google'
                />
            </View>

        </View>
    )
}