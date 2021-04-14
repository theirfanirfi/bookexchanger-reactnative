import * as React from 'react';
import { View, FlatList, Image, Text, Platform, RefreshControl } from 'react-native';
import colors from '../constants/colors'
import BookExchangeItem from '../components/Books/BookExchangeItem'
import { get, post, _delete } from '../apis/index'
import { Input } from 'react-native-elements'
const nobooks = require('../assets/graphics/nobooks.png');
import { Icon } from 'react-native-elements'

export default class BooksSearchAPI extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        refreshing: false,
        book: [],
        search_keyword: '',
        page: 1,
        books: [],
        isLoading: false,
        message: 'Search books by title, author, isbn',
        limit: 4
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
        // this.getBooks("s");
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

    searchForBooks = async () => {
        this.setState({ isLoading: true, message: 'search is in progress' })
        // third party apis
        let BOOKS_REPO_API = `http://openlibrary.org/search.json?q=${this.state.search_keyword}&limit=${this.state.limit}&page=${this.state.page}`
        fetch(BOOKS_REPO_API).then(res => res.json()).then(res => {
            let books = res.docs
            let formated_books = []
            if (books.length > 0) {
                books.forEach((book, index) => {
                    let book_formated = {
                        book_title: book.title,

                        book_author: book.author_name != undefined && book.author_name.length > 0 ? book.author_name[0] : book.author_name,
                        book_isbn: book.isbn != undefined && book.isbn.length > 0 ? book.isbn[0] : book.isbn,
                        book_cover_image: `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    };
                    formated_books.push(book_formated)

                })
                if (this.state.books.length > 0) {
                    this.setState({ books: this.state.books.concat(formated_books), isLoading: false, message: 'books found' })
                } else {
                    this.setState({ books: formated_books, isLoading: false })

                }
            } else {
                this.setState({ message: 'No matching books found', isLoading: false })

            }


        });
    }

    nextPage = async () => {
        this.setState({ page: this.state.page + 1 }, () => this.searchForBooks());

    }

    listHeader = () => {
        return (
            <Input
                placeholder="search"
                onChangeText={(text) => this.setState({ search_keyword: text })}
                rightIcon={<Icon type='ionicon' name="search-outline" size={26} onPress={() => this.searchForBooks()} />}

            />
        )
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <Text style={{ alignSelf: 'center', margin: 12 }}>Provide Book in exchange</Text>
                <FlatList
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.isLoading}
                        onRefresh={() => this.searchForBooks()} />
                    }
                    data={this.state.books}
                    ListHeaderComponent={this.listHeader}
                    onEndReached={() => this.nextPage()}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item }) => <BookExchangeItem book_to_provide_in_exchange={item} book_to_get_in_exchange={this.state.book} isApiCall={false} context={this} navigation={this.props.navigation} />}

                />
            </View>
        );
    }
}
