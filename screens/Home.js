import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import colors from '../constants/colors'
import PostItem from '../components/Posts/PostItem'
import { get, post, _delete } from '../apis/index'

class Home extends React.Component {
  state = {
    token: 'sometoken',
    posts: [],
    user: []
  }

  async componentDidMount() {
    let response = await get(this, 'post/')
    if (response.status) {
      let res = response.response
      if (res.posts.length > 0) {
        this.setState({ posts: res.posts });

      } else {
        // return false;
      }
    } else {
      // return false;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => { return item.id }}
          renderItem={({ item }) => <PostItem context={this} post={item} />}

        />
      </View>
    );
  }
}
export default Home;
