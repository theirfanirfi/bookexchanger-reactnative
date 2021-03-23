import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
const Tab = createBottomTabNavigator();


import Home from '../screens/Home';
import BooksTab from '../screens/BooksTab';
import ListsTab from '../screens/ListsTab';
import AddBook from '../screens/AddBook';
import Settings from '../screens/Settings';
import CreatePost from '../screens/CreatePost';


import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../constants/colors'
import LogoText from '../components/header/LogoText'
import CircularImage from '../components/Images/CircularImage'
const profile_default_image = require('../assets/images/default.png');


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderRight from '../components/header/HeaderRight';

function headerOptions(navigator) {
  return (
    {
      headerStyle: { elevation: 0, shadowOpacity: 0, },
      headerTitleStyle: { alignSelf: 'center' },
      headerTitle: () => {
        return (
          <LogoText />
        )
      },
      headerLeft: (nav) => <HeaderLeft nav={nav} navigator={navigator} />,
      headerRight: (nav) => {
        return (
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Icon name="search" size={25} color="#3e3b3b" />

          </TouchableOpacity>
        )
      },
    }
  )
}

function BottomNavigation() {
  return (
    <Tab.Navigator lazy={true} initialRouteName="Feed" tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'gray',
      style: { backgroundColor: colors.headerTextColor },
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
      <Tab.Screen name="Feed" component={HomePostNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />,
      }} />
      <Tab.Screen name="Books" component={BooksNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="book" color={color} size={28} />,
      }} />

      <Tab.Screen name="Lists" component={ListNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="list" color={color} size={28} />,
      }} />


      <Tab.Screen name="Create" component={CreatePostNavigator} options={{
        tabBarIcon: ({ color }) => <Icon name="plus" color={color} size={28} />,
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
