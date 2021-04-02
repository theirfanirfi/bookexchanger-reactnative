import * as React from 'react';
import { View, FlatList } from 'react-native';
import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input } from 'react-native-elements'
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome'


const data = [
    {
        "id": 1,
        "post_image": 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320514881l/109512.jpg',
        "post_title": 'The Fist of God',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 2,
        "post_image": 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1428715580l/52036.jpg',
        "post_title": 'Siddhartha ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 3,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'The White Tiger',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 4,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'A Dawn Like Thunder',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    }
    , {
        "id": 5,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'The God of small things',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    }
];

const actions = [
    {
        text: "Add Book",
        icon: <Icon name="plus" color="white" />,
        name: "add_book",
        position: 1
    },
];



class BooksTab extends React.Component {

    listHeader = () => {
        return (
            <Input placeholder="search" leftIcon={{ type: 'font-awesome', name: 'search', color: 'lightgray' }} />
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
                <FlatList
                    data={data}
                    ListHeaderComponent={this.listHeader}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={({ item }) => <BookItem book={item} isApiCall={false} context={this} navigation={this.props.navigation} />}

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
    }
}
export default BooksTab;
