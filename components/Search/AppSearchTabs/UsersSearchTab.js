import * as React from 'react';
import { Text, View, Image, FlatList, RefreshControl } from 'react-native';
const nouser = require('../../../assets/graphics/nouserpost.png');
import UserRowComponent from '../UserRowComponent'
import colors from '../../../constants/colors'
import { get } from '../../../apis/index'

export default class UserSearchTab extends React.Component {
    state = {
        search_term: null,
        users: [],
        token: '',
        refreshing: false,

    }

    componentDidMount() {
        const { term } = this.props
        this.setState({ search_term: term }, () => this.getUsers())
    }

    static getDerivedStateFromProps(props, state) {
        if (props.term != state.search_term && props.term != undefined) {
            return {
                search_term: props.term
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.term != prevProps.term) {
            this.getUsers()
        }
    }

    async getUsers() {
        this.setState({ refreshing: true });
        let response = await get(this, `profile/search/${this.state.search_term}`)
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.users.length > 0) {
                this.setState({ users: res.users, refreshing: false });

            } else {
                this.setState({ users: [], refreshing: false });

            }
        } else {
            // return false;
            this.setState({ users: [], refreshing: false });
        }
    }

    render() {
        if (this.state.users.length > 0) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>

                    <FlatList
                        refreshControl={<RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.getUsers()} />
                        }
                        data={this.state.users}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <UserRowComponent
                            key={item.id}
                            context={this}
                            user={item}
                            navigation={this.props.navigation} />}

                    />
                </View>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
                    {/* <Image source={noposts} style={{ width: 200, height: 200, alignSelf: 'center' }} /> */}
                    <Text style={{ alignSelf: 'center' }}>No User found.</Text>
                </View>
            )
        }
    }
}
