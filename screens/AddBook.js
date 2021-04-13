import * as React from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input, Icon } from 'react-native-elements'

class AddBook extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        search_keyword: '',
        page: 1,
        books: [],
        isLoading: false,
    }

    searchForBooks = async () => {
        this.setState({ isLoading: true })
        // third party apis
        let BOOKS_REPO_API = `http://openlibrary.org/search.json?q=${this.state.search_keyword}&limit=8&page=${this.state.page}`
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
                    console.log(book_formated)
                    formated_books.push(book_formated)

                })

                this.setState({ books: formated_books, isLoading: false })
            }


        });
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
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item }) => <BookItem book={item} isApiCall={true} context={this} navigation={this.props.navigation} />}

                />
            </View>
        );
    }
}
export default AddBook;
