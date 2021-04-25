import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text, Platform, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors'
import BookItem from '../Books/BookItem'
import { get, post, _delete } from '../../apis/index'
const nobooks = require('../../assets/graphics/nobooks.png');



class BooksTab extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        books: [],
        refreshing: false,
        profile_id: "me"
    }

    async getBooks() {
        this.setState({ refreshing: true });
        let response = await get(this, `book/user_books/${this.state.profile_id}/`)
        if (response.status) {
            let res = response.response
            // if (res.books.length > 0) {
            this.setState({ books: res.books, refreshing: false });

            // } else {
            //     this.setState({ refreshing: false });

            // }
        } else {
            // return false;
            this.setState({ refreshing: false });
        }
    }

    componentDidMount() {

        const { profile_id } = this.props

        this.setState({ profile_id: profile_id }, () => this.getBooks())
        this.props.navigation.addListener('focus', async () => {
            this.setState({ refreshing: true }, () => this.getBooks())
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

        if (this.state.books.length > 0) {

            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                colors={["#9Bd35A", "#689F38"]}
                                refreshing={this.state.refreshing}
                                onRefresh={() => this.getBooks()} />
                        }
                        data={this.state.books}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <BookItem
                            show_delete_option={this.state.profile_id == "me" ? true : false}
                            book={item}
                            isApiCall={false}
                            context={this}
                            navigation={this.props.navigation} />}

                    />
                </View>
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
                    <Image source={nobooks} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                    <Text style={{ alignSelf: 'center' }}>No books</Text>
                </View>
            )
        }
    }
}
export default BooksTab;
