import * as React from 'react';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
const noposts = require('../../../assets/graphics/nouserpost.png');
import { get } from '../../../apis/index'
import PostItem from '../../Posts/PostItem'
import colors from '../../../constants/colors'
export default class PostSearchTab extends React.Component {
    state = {
        search_term: null,
        posts: [],
        token: '',
        user: [],
        extraData: false,
        that: this,
    }
    componentDidMount() {
        const { term } = this.props
        this.setState({ search_term: term }, () => this.getPosts())
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term != state.search_term && props.term != undefined) {
            console.log(props.term)
            console.log(!state.extraData)
            return {
                search_term: props.term,
                extraData: true,
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.term != prevProps.term) {
            this.getPosts()
        }
    }


    async getPosts() {
        this.setState({ refreshing: true });
        let response = await get(this, `post/search/${this.state.search_term}`)
        if (response.status) {
            let res = response.response
            console.log(res.posts[0])
            if (res.posts.length > 0) {
                this.setState({ posts: res.posts, refreshing: false, extraData: false });

            } else {
                this.setState({ posts: [], refreshing: false, extraData: false });

            }
        } else {
            this.setState({ posts: [], refreshing: false, extraData: false });

        }
    }

    render() {
        if (this.state.posts.length > 0) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>

                    <FlatList
                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.getPosts()} />
                        }
                        extraData={this.state.extraData}
                        data={this.state.posts}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <PostItem
                            key={item.id}
                            context={this}
                            post={item}
                            navigation={this.props.navigation} />}

                    />
                </View>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
                    <Image source={noposts} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                    <Text style={{ alignSelf: 'center' }}>No Posts</Text>
                </View>
            )
        }
    }
}
