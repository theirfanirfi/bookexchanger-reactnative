import React, { useEffect } from 'react'
import { Text, View, Image, NativeModules, ActivityIndicator } from 'react-native'
import { auth_request, encode, } from '../apis/index'
const logo = require('../assets/graphics/logo.png')
import { SocialIcon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
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
        isLoading: true
    }


    handleFacebookLogin() {
        let that = this;
        this.setState({ isLoading: true });
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Login cancelled')
                    this.setState({ isLoading: false });

                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())
                            const infoRequest = new GraphRequest(
                                '/me?fields=name,picture,id',
                                null,
                                that._responseInfoCallback
                            );
                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start();

                        }
                    )
                }
            },
            function (error) {
                this.setState({ isLoading: false });
                alert('Login Failed')
                console.log('Login fail with error: ' + error)
            }
        )
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('user', value)
            this.setState({ isLoading: false });

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
                this.setState({ isLoading: false });

            }
        } else {
            alert('Error occurred, please try again');
            this.setState({ isLoading: false });

        }
    }

    _twitterSignIn = () => {
        this.setState({ isLoading: true });

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
                this.setState({ isLoading: false });

            }
            )
    }


    //Create response callback.
    _responseInfoCallback = (error, result) => {
        console.log(result);
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
                {this.state.isLoading &&
                    <View style={{ marginVertical: 12 }}>
                        <ActivityIndicator color="41cece" size="large" />
                        <Text style={{ alignSelf: 'center' }}>Please wait...</Text>
                    </View>
                }
                <View style={{ margin: 30 }}>
                    <SocialIcon
                        onPress={() => this._twitterSignIn()}
                        title='Sign In With Twitter'
                        button
                        raised
                        type='twitter'
                    />


                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        raised
                        onPress={() => this.handleFacebookLogin()}
                        type='facebook'
                    />
                </View>

            </View>
        )
    }
}