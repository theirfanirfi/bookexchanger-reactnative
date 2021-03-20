import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import colors from '../constants/colors'
import PostItem from '../components/Posts/PostItem'

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
]

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
        <FlatList
          data={data}
          keyExtractor={(item) => { return item.id }}
          renderItem={({ item }) => <PostItem post={item} />}

        />
      </View>
    );
  }
}
export default Home;
