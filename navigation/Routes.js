import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, Image } from 'react-native';
const Tab = createBottomTabNavigator();


import Home from '../screens/Home';
import BooksTab from '../screens/BooksTab';
import ListsTab from '../screens/ListsTab';
import AddBook from '../screens/AddBook';
import Settings from '../screens/Settings';
import CreatePost from '../screens/CreatePost';


// import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../constants/colors'
import LogoText from '../components/header/LogoText'
import CircularImage from '../components/Images/CircularImage'
const profile_default_image = require('../assets/images/default.png');


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderLeftLocation from '../components/header/HeaderLeftLocation';
import HeaderRight from '../components/header/HeaderRight';
import Chats from '../screens/Chats';

//bottomTabNav icons
const HOME_TAB_ICON = require('../assets/icons/home.png')
const CHAT_TAB_ICON = require('../assets/icons/chat.png')
const STACK_TAB_ICON = require('../assets/icons/stack.png')
const NOTIFICATION_TAB_ICON = require('../assets/icons/notification.png')
const SEARCH_ICON = require('../assets/icons/explore.png')

import { Icon } from 'react-native-elements'

function headerOptions(navigator) {
  return (
    {
      headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#7D4DFF', height: 60, },
      headerTitleStyle: { alignSelf: 'center' },
      headerTitle: null,
      headerLeft: (nav) => <HeaderLeftLocation nav={nav} navigator={navigator} />,
      headerRight: (nav) => {
        return (
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Icon name="notifications-outline" type="ionicon" color="white" size={28} />
          </TouchableOpacity>
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


function CreatePostNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="create" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create" component={CreatePost} />
    </Stack.Navigator>
  )
}

function ChatsNavigator(navigator) {
  return (
    <Stack.Navigator initialRouteName="chats" screenOptions={{ headerStyle: { backgroundColor: '#7D4DFF' }, headerTitle: 'Chat', headerTitleStyle: { color: 'white' } }}>
      <Stack.Screen name="chats" component={Chats} />
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

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="root" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="root" component={BottomNavigation} />
      <Stack.Screen name="auth" component={AuthNavigator} />
    </Stack.Navigator>
  )
}
