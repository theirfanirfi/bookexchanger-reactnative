import * as React from 'react';
import { Text, View, Image } from 'react-native';
const nouser = require('../../../assets/graphics/nouserpost.png');

export default class UserSearchTab extends React.Component {
    state = {
        search_term: null,
        users: []
    }
    // componentDidMount() {
    //     const { term } = this.props.route.params
    //     this.setState({ search_term: term }, () => console.log(this.state.search_term))
    // }

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
        if (this.state.users.length > 0) {
            return (
                <Text>Users</Text>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                    <Image source={nouser} style={{ width: 200, height: 210, alignSelf: 'center', }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }} >
                        No user found
                        </Text>
                </View>
            )
        }
    }
}
