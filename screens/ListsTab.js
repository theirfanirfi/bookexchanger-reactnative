import * as React from 'react';
import { View, FlatList } from 'react-native';
import colors from '../constants/colors'
import ListItem from '../components/List/ListItem'
import { Input, Button } from 'react-native-elements'
import { Col, Row } from "react-native-easy-grid";


const data = [
    {
        "id": '1',
        "list_name": 'My list 1',
    },
    {
        "id": '2',
        "list_name": 'My list 2',

    },
    {
        "id": '3',
        "list_name": 'My list 3',

    },
    {
        "id": '4',
        "list_name": 'My list 4',

    }
    , {
        "id": '5',
        "list_name": 'My list 5'

    }
];




class ListsTab extends React.Component {

    listHeader = () => {
        return (
            <Row>
                <Col style={{ width: '70%' }}>
                    <Input placeholder="Create New list" />
                </Col>
                <Col>
                    <Button containerStyle={{ margin: 8 }} title="Create list" />
                </Col>
            </Row>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <FlatList
                    data={data}
                    ListHeaderComponent={this.listHeader}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item }) => <ListItem list={item} />}

                />
            </View>
        );
    }
}
export default ListsTab;
