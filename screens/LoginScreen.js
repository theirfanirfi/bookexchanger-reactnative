import React, { useEffect } from 'react'
import { View, Image, NativeModules } from 'react-native'
import { auth_request, encode, } from '../apis/index'
const logo = require('../assets/graphics/logo.png')
import { SocialIcon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
const { RNTwitterSignIn } = NativeModules

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: "qWPj1TXbreMX1SsDvdiQTaF7Y",
    TWITTER_CONSUMER_SECRET: "4t0cRfGWXZvySIa5sS0M38AnT8a8B8hwcX2lZiaStSWStD4B4Z"
}

export default class LoginScreen extends React.Component {
    state = {
        fbUserId: null,
        fbToken: null,
    }
    componentDidMount() {
        // setTimeout(() => {
        //     props.navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'root', screen: 'Home' }]
        //     });
        // }, 5000)

        GoogleSignin.configure({
            webClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com',
            iosClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com',

            // webClientId: '901252522520-r831fpbuhpjtqcgkbmsp2rqv84cu9u0i.apps.googleusercontent.com'
        })


    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('user', value)
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'root', screen: 'Home' }]
            });
        } catch (e) {
            alert('Invalid credentials');
        }
    }

    login = async (userID, name, token, userName, profile_image = null) => {
        let form = new FormData()
        form.append("token", encode(token));
        form.append("fullname", encode(name));
        form.append("user_id", encode(userID));
        form.append("username", encode(userName));
        if (profile_image != null) {
            form.append("profile_image", encode(profile_image));
        }

        const response = await auth_request(form, 'auth/login')
        console.log(response);

        if (response.status) {
            let res = response.response
            if (res.isLoggedIn) {
                let user = res.user;
                let token = user.token
                user.token = encode(token);
                user = JSON.stringify(res.user)
                this.storeData(user);
            } else {
                alert('Invalid credentials.')
            }
        }
    }

    _twitterSignIn = () => {
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
        RNTwitterSignIn.logIn()
            .then(loginData => {
                console.log(loginData)
                const { authToken, authTokenSecret, name, userID, userName } = loginData
                if (authToken && authTokenSecret) {
                    console.log('login data')
                    this.login(userID, name, authToken, userName, null);
                }
            })
            .catch(error => {
                console.log(error)
            }
            )
    }

    signIn = async () => {
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

    //Create response callback.
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            this.login(result.id, result.name, result.id, result.name, result.picture.data.url);
        }
    }


    render() {
        return (
            <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                <Image source={logo} style={{ alignSelf: 'center', width: 200, height: 200 }} />
                <View style={{ margin: 30 }}>
                    <SocialIcon
                        onPress={() => this._twitterSignIn()}
                        title='Sign In With Twitter'
                        button
                        raised
                        type='twitter'
                    />


                    {/* <SocialIcon
                        title='Sign In With Google'
                        button
                        raised
                        onPress={() => this.signIn()}
                        type='google'
                    /> */}

                    <LoginButton
                        style={{ width: '100%', height: '20%', }}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(data.accessToken.toString())
                                            const infoRequest = new GraphRequest(
                                                '/me?fields=name,picture',
                                                null,
                                                this._responseInfoCallback
                                            );
                                            // Start the graph request.
                                            new GraphRequestManager().addRequest(infoRequest).start();

                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")} />

                    {/* <Button name="logo-twitter" onPress={() => _twitterSignIn()} title="Login with Twitter" /> */}
                </View>

            </View>
        )
    }
}