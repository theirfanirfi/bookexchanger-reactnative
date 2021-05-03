import * as React from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import colors from '../constants/colors'
import { Input } from 'react-native-elements'
import { get, post, _delete } from '../apis/index'
import ListItem from '../components/List/ListItem'
const nostack = require('../assets/graphics/nostack.png')




export default class AddToListScreen extends React.Component {
    state = {
        token: 'sometoken',
        user: [],
        lists: [],
        book_id: 0
    }

    async componentDidMount() {
        const { book_id } = await this.props.route.params
        console.log('Book id: ' + book_id)
        let response = await get(this, 'list/')
        if (response.status) {
            let res = response.response
            this.setState({ lists: res.lists, book_id: book_id });
        } else {
            //alert
        }
    }

    static getStateDerivedFromProps(props, state) {
        if (state.book_id != props.book_id && props.book_id != undefined) {
            return {
                book_id: props.book_id
            }
        }
        return null;

    }

    listHeader = () => {
        return (
            <Input placeholder="search" leftIcon={{ type: 'font-awesome', name: 'search', color: 'lightgray' }} />
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>


                {this.state.lists.length == 0 ? (
                    <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
                        <Image source={nostack} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                        <Text style={{ alignSelf: 'center' }}>You have not created stacks yet.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={(item) => { return item.id }}
                        renderItem={({ item, index }) => <ListItem context={this} book_id={this.state.book_id} isAddToList={true} list={item} index={index} deleteListCallBack={null} />}
                    />
                )


                }
            </View>
        );
    }
}
