import * as React from 'react';
import { View, FlatList, Image, Text, Platform } from 'react-native';
import colors from '../constants/colors'
import BookExchangeItem from '../components/Books/BookExchangeItem'
import { get, post, _delete } from '../apis/index'
import { Input } from 'react-native-elements'
const nobooks = require('../assets/graphics/nobooks.png');

export default class BooksSearchAPI extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        books: [],
        refreshing: false,
        book: []
    }

    async getBooks(text) {
        this.setState({ refreshing: true });
        let response = await get(this, 'book/')
        console.log(response)
        if (response.status) {
            let res = response.response
            if (res.books.length > 0) {
                this.setState({ books: res.books, refreshing: false });

            } else {
                this.setState({ refreshing: false });

            }
        } else {
            // return false;
            this.setState({ refreshing: false });
        }
    }

    async componentDidMount() {
        this.setState({ book: this.props.book });
        this.getBooks("s");
    }

    static getDerivedStateFromProps(props, state) {
        if (state.book != props.book && props.book != undefined) {
            return {
                book: props.book
            }
        } else {
            return {
                book: []
            }
        }
    }


    listHeader = () => {
        return (
            <Input placeholder="search" onChangeText={(text) => this.getBooks(text)} leftIcon={{ type: 'ionicon', name: 'search-outline', color: 'lightgray' }} />
        )
    }
    render() {

        if (this.state.books.length > 0) {

            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                    <Text style={{ alignSelf: 'center', margin: 12 }}>Provide Book in exchange</Text>
                    <FlatList
                        data={this.state.books}
                        ListHeaderComponent={this.listHeader}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <BookExchangeItem book_to_provide_in_exchange={item} book_to_get_in_exchange={this.state.book} isApiCall={false} context={this} navigation={this.props.navigation} />}

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
