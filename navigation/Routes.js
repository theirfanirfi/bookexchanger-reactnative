import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, Image, View } from 'react-native';
const Tab = createBottomTabNavigator();


import Home from '../screens/Home';
import BooksTab from '../screens/BooksTab';
import ListsTab from '../screens/ListsTab';
import AddBook from '../screens/AddBook';
import Settings from '../screens/Settings';
import CreatePost from '../screens/CreatePost';
import Chat from '../screens/Chat';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import LocationPicker from '../screens/LocationPicker';
import Profile from '../screens/Profile';



// import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../constants/colors'
import LogoText from '../components/header/LogoText'
import CircularImage from '../components/Images/CircularImage'
const profile_default_image = require('../assets/images/default.png');


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderLeftLocation from '../components/header/HeaderLeftLocation';
import HeaderRight from '../components/header/HeaderRight';
import AppSearchHeader from '../components/header/AppSearchHeader';
import Chats from '../screens/Chats';

//bottomTabNav icons
const HOME_TAB_ICON = require('../assets/icons/home.png')
const CHAT_TAB_ICON = require('../assets/icons/chat.png')
const STACK_TAB_ICON = require('../assets/icons/stack.png')
const NOTIFICATION_TAB_ICON = require('../assets/icons/notification.png')
const SEARCH_ICON = require('../assets/icons/explore.png')

import { Icon, Input } from 'react-native-elements'

function headerOptions(navigator) {
  return (
    {
      headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#7D4DFF', height: 60, },
      headerTitleStyle: { alignSelf: 'center' },
      headerTitle: null,
      headerLeft: (nav) => <HeaderLeftLocation nav={nav} navigator={navigator} />,
      headerRight: (nav) => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 12 }} onPress={() => navigator.navigation.navigate('notifications')}>
              <Icon name="notifications-outline" type="ionicon" color="white" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigator.navigation.navigate('search', { screen: 'search-app', params: { term: undefined } })}>
              <Icon name="search-outline" type="ionicon" color="white" size={28} style={{ marginHorizontal: 12 }} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigator.navigation.navigate('profile')}>
              <Icon name="person-circle-outline" type="ionicon" color="white" size={28} style={{ marginHorizontal: 12 }} />
            </TouchableOpacity>
          </View>
        )
      },
    }
  )
}

function getTabIcon(icon) {
  return <Image style={{ width: '30%', height: '75%' }} source={icon} />
}

function BottomNavigation() {
  return (
    <Tab.Navigator lazy={true} initialRouteName="Feed" tabBarOptions={{
      activeTintColor: '#7D4DFF',
      inactiveTintColor: 'gray',

      style: { backgroundColor: '#fff' },
      headerLeft: () => {
        return (
          <CircularImage image={null}
            style={null}
            size="small"
          />
        )
      },
    }}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Tab.Screen name="Home" component={HomePostNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="home-outline" type='ionicon' color={color} size={25} />,
      }} />
      <Tab.Screen name="Explore" component={BooksNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="book-outline" type='ionicon' color={color} size={28} />,
      }} />

      <Tab.Screen name="Create" component={CreatePostNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="pencil" type='evilicon' color={color} size={28} />,
      }} />

      <Tab.Screen name="Lists" component={ListNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="file-tray-stacked-outline" type='ionicon' color={color} size={25} />,
      }} />

      <Tab.Screen name="chats" component={ChatsNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="comment" type='evilicon' color={color} size={28} />,
      }} />



      {/*<Tab.Screen name="Clubs" component={Settings} />*/}
      {/*<Tab.Screen name="Chat" component={Settings} />*/}
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();



function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Home} />
      <Stack.Screen name="register" component={BottomNavigation} />
    </Stack.Navigator>
  )
}
function searchNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="search-app" screenOptions={AppSearchHeader(navigator)}>
      <Stack.Screen name="search-app" component={Search} />
    </Stack.Navigator>
  )
}

function CreatePostNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="create" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" component={CreatePost} />
    </Stack.Navigator>
  )
}

function ChatsNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="chats" screenOptions={{ headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: 'Chat', headerTintColor: 'white' }}>
      <Stack.Screen name="chats" component={Chats} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function HomePostNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="home" screenOptions={headerOptions(navigator)}>
      <Stack.Screen name="home" component={Home} />

    </Stack.Navigator>
  )
}

function ListNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="list" screenOptions={headerOptions(navigator)}>
      <Stack.Screen name="list" component={ListsTab} />
    </Stack.Navigator>
  )
}


function BooksNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="books" screenOptions={headerOptions(navigator)}>
      <Stack.Screen name="books" component={BooksTab} />
      <Stack.Screen name="addbook" component={AddBook} />
    </Stack.Navigator>
  )
}

function notificationsNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="notifications" screenOptions={{ headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: 'Notifications', headerTintColor: 'white' }}>
      <Stack.Screen name="notifications" component={Notifications} />
    </Stack.Navigator>
  )
}

function locationNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="location" screenOptions={{ headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: 'Pick your location', headerTintColor: 'white' }}>
      <Stack.Screen name="location" component={LocationPicker} />
    </Stack.Navigator>
  )
}

function profileNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="profile" screenOptions={{ headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: 'Profile', headerTintColor: 'white' }}>
      <Stack.Screen name="profile" component={Profile} />
    </Stack.Navigator>
  )
}

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="root" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="root" component={BottomNavigation} />
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="search" component={searchNavigator} />
      <Stack.Screen name="notifications" component={notificationsNavigator} />
      <Stack.Screen name="location" component={locationNavigator} />
      <Stack.Screen name="profile" component={profileNavigator} />
    </Stack.Navigator>
  )
}
