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
        book: []
    }

    async componentDidMount() {
        const { book } = await this.props.route.params
        let response = await get(this, 'list/')
        if (response.status) {
            let res = response.response
            this.setState({ lists: res.lists, book: book });
        } else {
            //alert
        }
    }

    static getStateDerivedFromProps(props, state) {
        if (state.book != props.book && props.book != undefined) {
            return {
                book: props.book
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
                        renderItem={({ item, index }) => <ListItem context={this} book={this.state.book} isAddToList={true} list={item} index={index} deleteListCallBack={null} />}
                    />
                )


                }
            </View>
        );
    }
}
