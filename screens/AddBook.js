import * as React from 'react';
import { View, FlatList } from 'react-native';
import colors from '../constants/colors'
import BookItem from '../components/Books/BookItem'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'


const data = [
    {
        "id": 1,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'Marvel of engineering: spectacular drone shot ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 2,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'Marvel of engineering: spectacular drone shot ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 3,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'Marvel of engineering: spectacular drone shot ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    },
    {
        "id": 4,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'Marvel of engineering: spectacular drone shot ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    }
    , {
        "id": 5,
        "post_image": 'https://i.dawn.com/thumbnail/2021/03/6054e4af8f616.jpg',
        "post_title": 'Marvel of engineering: spectacular drone shot ',
        "post_description": "Marvel of engineering: spectacular drone shot of a three-story highway built along Tianlong Mountain in Taiyuan of North China's Shanxi province. The circular highway bridge is 30 kilometers long and spans the mountain at a height of 350 meters."

    }
];




class AddBook extends React.Component {

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
                    renderItem={({ item }) => <BookItem book={item} isApiCall={true} />}

                />
            </View>
        );
    }
}
export default AddBook;
