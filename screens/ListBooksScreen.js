import * as React from 'react';
import { View, FlatList, RefreshControl, Image, Text, Platform } from 'react-native';
import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input, Icon } from 'react-native-elements'
import { FloatingAction } from "react-native-floating-action";
import { get, post, _delete } from '../apis/index'
import { Grid, Row, Col } from 'react-native-easy-grid'
const nobooks = require('../assets/graphics/nobooks.png');
import DropDownPicker from 'react-native-dropdown-picker';
const actions = [
    {
        text: "Add Book",
        icon: <Icon type="ionicon" name="add-outline" color="white" />,
        name: "add_book",
        position: 1
    },
];



export default class ListBooksScreen extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        books: [],
        refreshing: false,
        filter: 'asc',
        filtered_books: [],
        list_id: null,
    }

    async getBooks() {
        this.setState({ refreshing: true });
        console.log(this.state.list_id)
        let response = await get(this, `stack/${this.state.list_id}/`)
        console.log(response)
        if (response.status) {
            let res = response.response
            console.log(res)
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
        // this.props.navigation.addListener('focus', async () => {
        //     this.setState({ refreshing: true }, () => this.getBooks())
        // })

        const { list_id } = await this.props.route.params
        this.setState({ list_id: list_id }, () => this.getBooks())
    }

    // static getDerivedStateFromProps(props, state){
    //     if(state.list_id != )
    // }

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
                        renderItem={({ item }) => <BookItem
                            show_delete_option={true}
                            book={item} isApiCall={false}
                            context={this} navigation={this.props.navigation} />}

                    />

                    <FloatingAction
                        actions={actions}
                        color="#7D4DFF"
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

