import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text, Platform } from 'react-native';
import colors from '../../../constants/colors'
import BookItem from '../../Books/BookItem';
import { Input, Icon } from 'react-native-elements'
const nobooks = require('../../../assets/graphics/nobooks.png');
import DropDownPicker from 'react-native-dropdown-picker';
import { get, post, _delete } from '../../../apis/index'

export default class BooksSearchTab extends React.Component {
    state = {
        search_term: null,
        books: [],
        token: 'sometoken',
        user: [],
        refreshing: false,
        filter: 'asc',
        filtered_books: []

    }
    componentDidMount() {
        const { term } = this.props
        this.setState({ search_term: term }, () => console.log(this.state.search_term))
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

    async getBooks() {
        this.setState({ refreshing: true });
        let response = await get(this, `search/books/${this.state.search_term}`)
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

    componentDidMount() {
        this.getBooks();
    }

    async filter_books(search_term) {
        let filter_array = this.state.books.filter((book) => {
            if (book.book_title.includes(search_term) || book.book_author.includes(search_term)) {
                return book;
            }
        })
        this.setState({ filtered_books: filter_array });


    }

    async sort_books_by_distance_in_ascending() {
        let filter_array = this.state.books.sort((bookA, bookB) => {
            return bookA.distance_in_km - bookB.distance_in_km
        })
        this.setState({ filtered_books: filter_array });
    }

    async sort_books_by_distance_in_desc() {
        let filter_array = this.state.books.sort((bookA, bookB) => {
            return bookB.distance_in_km - bookA.distance_in_km
        })
        this.setState({ filtered_books: filter_array });
    }


    listHeader = () => {
        return (
            <View style={{ flexDirection: 'row', zIndex: 10 }}>
                <View style={{ width: '70%' }}>
                    <Input placeholder="search" onChangeText={(text) => this.filter_books(text)} leftIcon={{ type: 'ionicon', name: 'search-outline', color: 'lightgray' }} />
                </View>
                <View style={{ width: '30%', zIndex: 10 }}>
                    <DropDownPicker
                        defaultValue={this.state.filter}
                        items={[
                            { label: 'ASC', value: 'asc' },
                            { label: 'DESC', value: 'desc' },
                        ]}
                        containerStyle={{ height: 40, marginTop: 12 }}
                        style={{ backgroundColor: '#fff', borderWidth: 0 }}
                        itemStyle={{
                            justifyContent: 'flex-start',

                        }}
                        dropDownStyle={{ backgroundColor: '#ffffff' }}
                        onChangeItem={item => this.setState({
                            filter: item.value
                        })}
                    />
                </View>

            </View>
        )
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
                        data={this.state.filtered_books.length > 0 ? this.state.filtered_books : this.state.books}
                        ListHeaderComponent={this.listHeader}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item }) => <BookItem book={item} isApiCall={false} context={this} navigation={this.props.navigation} />}

                    />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center' }}>
                    <Image source={nobooks} style={{ width: 200, height: 210, alignSelf: 'center', }} />
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold' }} >
                        No book found
                        </Text>
                </View>
            )
        }
    }
}
