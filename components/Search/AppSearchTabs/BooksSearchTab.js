import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text, TouchableOpacity } from 'react-native';
import colors from '../../../constants/colors'
import BookItem from '../../Books/BookItem';
import { Input, Icon } from 'react-native-elements'
const nobooks = require('../../../assets/graphics/nobooks.png');
import { get, post, _delete } from '../../../apis/index'
import Modal from 'react-native-modal';


export default class BooksSearchTab extends React.Component {
    state = {
        search_term: null,
        books: [],
        token: 'sometoken',
        user: [],
        refreshing: false,
        filter: 'asc',
        filtered_books: [],
        applied_filter: 'Nearest',
        visible: false

    }
    componentDidMount() {
        const { term } = this.props
        this.setState({ search_term: term }, () => this.getBooks())
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
            this.getBooks()
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
                this.setState({ books: [], refreshing: false });

            }
        } else {
            // return false;
            this.setState({ books: [], refreshing: false });
        }
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
