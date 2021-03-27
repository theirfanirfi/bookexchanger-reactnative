import * as React from 'react';
import { Text, View, Image } from 'react-native';
const nouserpost = require('../../../assets/graphics/nouserpost.png');
export default class PostSearchTab extends React.Component {
    state = {
        search_term: null,
        posts: []
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
        if (this.state.posts.length > 0) {
            return (
                <Text>Posts</Text>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                    <Image source={nouserpost} style={{ width: 200, height: 210, alignSelf: 'center', }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }} >
                        No Post found
                        </Text>
                </View>
            )
        }
    }
}
