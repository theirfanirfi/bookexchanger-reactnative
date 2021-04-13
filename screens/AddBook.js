import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text } from 'react-native';
import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input, Icon } from 'react-native-elements'
const nobooks = require('../assets/graphics/nobooks.png')

class AddBook extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        search_keyword: '',
        page: 1,
        books: [],
        isLoading: false,
        message: 'Search books by title, author, isbn',
        limit: 4
    }

    searchForBooks = async () => {
        this.setState({ isLoading: true })
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
                    this.setState({ books: this.state.books.concat(formated_books), isLoading: false })
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
                rightIcon={<Icon name="search-outline" type="ionicon" size={30} onPress={() => this.searchForBooks()} />} />
        )
    }
    render() {


        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>


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
                    renderItem={({ item }) => <BookItem book={item} isApiCall={true} context={this} navigation={this.props.navigation} />}

                />
                {this.state.books.length == 0 && <>
                    <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1, marginBottom: 80 }}>
                        <Image source={nobooks} style={{ width: 200, height: 200, alignSelf: 'center', }} />
                        <Text style={{ alignSelf: 'center' }}>{this.state.message}</Text>
                    </View>
                </>}
            </View>
        );
    }
}
export default AddBook;
