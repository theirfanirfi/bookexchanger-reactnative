const BASE_URL = "http://192.168.10.7:5000";
const endpoint = BASE_URL + "/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';

export const getEndPointUrl = () => {
    return endpoint
}

export const getBaseUrl = () => {
    return BASE_URL
}

export const encode = value => {
    return base64.encode(value);
}

export const getToken = async (context) => {
    let isLoggedIn = await AsyncStorage.getItem('token').then(item => {
        if (item !== null) {
            context.setState({ 'isLoggedIn': true }, () => {
                context.setState({ 'token': item });
            });
            return true;
        } else {
            return false;
        }
    });
}

export const getTokenForComponent = async (context) => {
    let isLoggedIn = await AsyncStorage.getItem('token').then(item => {
        if (item !== null) {
            context.setState({ token: item });
            return true;
        } else {
            return false;
        }
    });
}

export const postWithImages = async (context, pUrl, form) => {
    await getToken(context);
    try {
        const url = `${endpoint}/${pUrl}/`
        const response = await fetch(url, {
            method: "POST",
            body: form,
            headers: {
                'Authorization': context.state.token,
                'Content-Type': 'multipart/form-data'
            }
        });
        const responseJson = await response.json()
        // context.setState({ message: responseJson.message });
        return {
            response: responseJson,
            status: true
        };
    } catch (err) {
        return {
            status: false,
            response: err
        }
    }
}

export const post = async (context, pUrl, form) => {
    await getToken(context);
    try {
        const url = `${endpoint}/${pUrl}/`
        const response = await fetch(url, {
            method: "POST",
            body: form,
            headers: {
                'Authorization': context.state.token,
            }
        });
        const responseJson = await response.json()
        // context.setState({ message: responseJson.message });
        return {
            response: responseJson,
            status: true
        };
    } catch (err) {
        return {
            status: false,
            response: err
        }
    }
}

export const get = async (context, pUrl) => {
    await getToken(context);
    console.log(context.state.token)
    try {
        const url = `${endpoint}/${pUrl}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': context.state.token,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            }
        });
        const responseJson = await response.json()
        // context.setState({ message: responseJson.message });
        return {
            response: responseJson,
            status: true
        };
    } catch (err) {
        return {
            status: false,
            response: err
        }
    }
}

export const _delete = async (context, pUrl) => {
    await getToken(context);
    console.log(context.state.token)
    try {
        const url = `${endpoint}/${pUrl}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': context.state.token,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
            }
        });
        const responseJson = await response.json()
        // context.setState({ message: responseJson.message });
        return {
            response: responseJson,
            status: true
        };
    } catch (err) {
        return {
            status: false,
            response: err
        }
    }
}