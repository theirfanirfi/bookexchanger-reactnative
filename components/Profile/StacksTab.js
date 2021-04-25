import * as React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import colors from '../../constants/colors'
import ListItem from '../List/ListItem'
import { get, post } from '../../apis/index'

export default class StacksTab extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        lists: [],
        list_title: "",
        list_title_error_message: "",
        refreshing: false,
        profile_id: "me"

    }

    async getLists() {
        this.setState({ refreshing: false });

        let response = await get(this, `list/user/${this.state.profile_id}/`)
        if (response.status) {
            let res = response.response
            this.setState({ lists: res.lists, refreshing: false });
        } else {
            //alert
        }
    }

    async componentDidMount() {
        const { profile_id } = this.props

        this.setState({ profile_id: profile_id }, () => this.getLists())

        this.props.navigation.addListener('focus', async () => {
            this.setState({ refreshing: true }, () => this.getLists())
        })

    }

    static getStateDerivedFromProps(props, state) {
        if (state.profile_id != props.profile_id && props.profile_id != undefined) {
            return {
                profile_id: props.profile_id
            }
        }
        return null;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <FlatList
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getLists()} />
                    }
                    data={this.state.lists}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item, index }) => <ListItem
                        isMe={this.props.isMe}
                        navigation={this.props.navigation}
                        context={this}
                        book_id={null}
                        isAddToList={false}
                        list={item} index={index}
                        deleteListCallBack={null} />}

                />
            </View>
        );
    }
}
