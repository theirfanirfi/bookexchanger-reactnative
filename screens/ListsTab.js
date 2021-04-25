import * as React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import colors from '../constants/colors'
import ListItem from '../components/List/ListItem'
import { Input, Button } from 'react-native-elements'
import { Col, Row } from "react-native-easy-grid";
import { get, post } from '../apis/index'

class ListsTab extends React.Component {

    state = {
        token: 'sometoken',
        user: [],
        lists: [],
        list_title: "",
        list_title_error_message: "",
        refreshing: false,

    }

    async getLists() {
        this.setState({ refreshing: false });

        let response = await get(this, 'list/')
        if (response.status) {
            let res = response.response
            this.setState({ lists: res.lists, refreshing: false });
        } else {
            //alert
        }
    }

    async componentDidMount() {


        this.props.navigation.addListener('focus', async () => {
            this.setState({ refreshing: true }, () => this.getLists())
        })

    }

    deleteListCallBack = index => {
        let lists = this.state.lists
        lists.splice(index, 1);
        this.setState({ lists: lists })
    }

    async createList() {
        if (this.state.list_title == "") {
            this.setState({ list_title_error_message: 'List title cannot be empty.' })
        } else {
            this.setState({ list_title_error_message: '' })
            let form = new FormData();
            form.append("list_title", this.state.list_title)
            let response = await post(this, 'list/create', form)
            if (response.status) {
                let res = response.response
                let lists = this.state.lists
                if (res.isListCreated) {
                    lists.push(res.list)
                    this.setState({ lists: lists, list_title: '' });
                } else {

                }
            } else {
                //alert
            }

        }
    }

    listHeader = () => {
        return (
            <Row>
                <Col style={{ width: '70%' }}>
                    <Input value={this.state.list_title} errorMessage={this.state.list_title_error_message} placeholder="Create New list" onChangeText={(text) => this.setState({ list_title: text })} />
                </Col>
                <Col>
                    <Button
                        buttonStyle={{ backgroundColor: '#41cece' }}
                        containerStyle={{ margin: 8 }}
                        title="Create list"
                        onPress={() => this.createList()} />
                </Col>
            </Row>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <FlatList
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.getLists()} />
                    }
                    data={this.state.lists}
                    ListHeaderComponent={this.listHeader}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item, index }) => <ListItem
                        navigation={this.props.navigation}
                        context={this} book_id={null}
                        isAddToList={false} list={item}
                        isMe={true}
                        index={index}
                        deleteListCallBack={this.deleteListCallBack} />}

                />
            </View>
        );
    }
}
export default ListsTab;
