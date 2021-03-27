import * as React from 'react';
import { Text, Image, View } from 'react-native';
const nonotification = require('../assets/graphics/notnotification.png');
export default class Notifications extends React.Component {
    state = {
        notifications: []
    }
    componentDidMount() {
        // const { term } = this.props.route.params
        // this.setState({ search_term: term }, () => console.log(this.state.search_term))
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log(props.route.params.term)
    //     if (props.route.params.term != state.search_term && props.route.params.term != undefined) {
    //         return {
    //             search_term: props.route.params.term
    //         }
    //     } else {
    //         return null;
    //     }
    // }



    render() {
        if (this.state.notifications.length > 0) {
            <Text>Notifications</Text>
        }
        else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                    <Image source={nonotification} style={{ width: 200, height: 210, alignSelf: 'center', }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }} >
                        We don't have any notification for you at the moment
                        </Text>
                </View>
            )
        }
    }
}

