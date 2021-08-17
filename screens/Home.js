import * as React from 'react';
import { Text, View, FlatList, RefreshControl, Image } from 'react-native';
import colors from '../constants/colors'
import PostItem from '../components/Posts/PostItem'
import { get, post, _delete } from '../apis/index'
import PushNotificationComponent from '../components/PushNotifications/PushNotificationComponent';
const noposts = require('../assets/graphics/nouserpost.png');
class Home extends React.Component {
  state = {
    token: 'sometoken',
    posts: [],
    user: [],
    refreshing: false,
  }

  getPosts = async () => {
    this.setState({ refreshing: true });
    let response = await get(this, 'post/')
    if (response.status) {
      let res = response.response
      if (res.posts.length > 0) {
        this.setState({ posts: res.posts, refreshing: false });

      } else {
        // return false;
        console.log('else 1')
        this.setState({ refreshing: false });

      }
    } else {
      // return false;
      console.log('else 2')

      this.setState({ refreshing: false });

    }
  }

  async componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.getPosts()
    })

    this.getPosts()
  }
  render() {
    if (this.state.posts.length > 0) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.screenBackgroundColor }}>
          <PushNotificationComponent navigation={this.props.navigation} context={this} />
          <FlatList
            refreshControl={<RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={this.state.refreshing}
              onRefresh={() => this.getPosts()} />
            }
            data={this.state.posts}
            keyExtractor={(item) => { return item.id }}
            renderItem={({ item }) => <PostItem
              key={item.id}
              context={this}
              post={item}
              navigation={this.props.navigation} />}

          />
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: 'center', backgroundColor: 'white', flex: 1 }}>
          <PushNotificationComponent navigation={this.props.navigation} context={this} />

          <Image source={noposts} style={{ width: 200, height: 200, alignSelf: 'center' }} />
          <Text style={{ alignSelf: 'center' }}>No Posts</Text>
        </View>
      )
    }
  }
}
export default Home;
