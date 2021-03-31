const endpoint = "http://192.168.10.2:5000"
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getEndPointUrl = () => {
    return endpoint
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