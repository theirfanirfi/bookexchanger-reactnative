import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text, Platform, TouchableOpacity } from 'react-native';

import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input, Icon } from 'react-native-elements'
import { FloatingAction } from "react-native-floating-action";
import { get, post, _delete } from '../apis/index'
const nobooks = require('../assets/graphics/nobooks.png');
import Modal from 'react-native-modal';
const actions = [
    {
        text: "Add Book",
        icon: <Icon type="ionicon" name="add-outline" color="white" />,
        name: "add_book",
        position: 1,

    },
];



class BooksTab extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        books: [],
        refreshing: false,
        filter: 'asc',
        filtered_books: [],
        visible: false,
        applied_filter: 'Nearest'
    }

    async getBooks() {
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
        this.props.navigation.addListener('focus', async () => {
            this.setState({ refreshing: true }, () => this.getBooks())
        })
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

    async sort_books_by_id() {
        let filter_array = this.state.books.sort((bookA, bookB) => {
            return bookA.book_id - bookB.book_id
        })
        this.setState({ filtered_books: filter_array });
    }

    listHeader = () => {
        return (
            <View style={{ flexDirection: 'row', zIndex: 10 }}>
                <View style={{ width: '80%' }}>
                    <Input placeholder="search" onChangeText={(text) => this.filter_books(text)} leftIcon={{ type: 'ionicon', name: 'search-outline', color: 'lightgray' }} />
                </View>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ visible: true })}>
                        <Text style={{ marginTop: 8 }}>{this.state.applied_filter} </Text>
                        <Icon name="chevron-down-outline" type="ionicon" size={22} style={{ marginTop: 8 }} />
                    </TouchableOpacity>
                </View>

                <Modal
                    onBackdropPress={() => this.setState({ visible: false })}
                    onBackButtonPress={() => this.setState({ visible: false })}
                    isVisible={this.state.visible} swipeDirection={['down']}
                    onSwipeComplete={() => { this.setState({ visible: false }) }}>
                    <View style={{ backgroundColor: '#fff', marginTop: 30, padding: 12, justifyContent: 'center' }}>
                        {/* <CommentWritingBoxComponent commentCallBack={this.commentCallBack} context={this} post={this.props.post} /> */}
                        {/* <CommentsComponent postt={this.props.post} /> */}
                        {/* </View> */}
                        <TouchableOpacity onPress={() => this.setState({ applied_filter: 'Nearest', visible: false }, () => this.sort_books_by_distance_in_ascending())}>
                            <Text style={{ marginTop: 14, alignSelf: 'center', fontSize: 18 }}>Nearest </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setState({ applied_filter: 'Newest', visible: false }, () => this.sort_books_by_id())}>
                            <Text style={{ marginTop: 14, alignSelf: 'center', fontSize: 18 }}>Newest </Text>

                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
        )
    }
    render() {

        if (this.state.books.length > 0) {

            return (
                <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor, zIndex: 2000 }}>
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

                    <FloatingAction
                        actions={actions}
                        color="#41cece"
                        onPressItem={name => {
                            switch (name) {
                                case 'add_book':
                                    this.props.navigation.navigate('addbook');
                                    break;
                            }
                            console.log(`selected button: ${name}`);
                        }}
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
