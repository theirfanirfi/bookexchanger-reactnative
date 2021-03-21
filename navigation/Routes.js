import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
const Tab = createBottomTabNavigator();
import Home from '../screens/Home';
import BooksTab from '../screens/BooksTab';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../constants/colors'
import LogoText from '../components/header/LogoText'
import CircularImage from '../components/Images/CircularImage'
const profile_default_image = require('../assets/images/default.png');


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

function BottomNavigation() {
  return (
    <Tab.Navigator initialRouteName="Feed" tabBarOptions={{
      activeTintColor: '#fff',
      inactiveTintColor: 'gray',
      style: { backgroundColor: colors.headerTextColor },

    }} screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerTitleStyle: { color: 'white' },
      headerStyle: { backgroundColor: colors.secondary },
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white',
      headerLeft: () => (
        <Text>Working</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {/* <Bell navigation={navigator.navigation} /> */}
          <Icon
            onPress={() => {
              navigator.navigation.navigate('EditProfile')
            }}
            name="user-circle-o"
            color="white"
            size={30}
            style={{ marginRight: 14 }}
          />
        </View>
      )
    }}
    >
      <Tab.Screen name="Feed" component={Home} options={{
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />,
      }} />
      <Tab.Screen name="Books" component={BooksTab} options={{
        tabBarIcon: ({ color }) => <Icon name="book" color={color} size={28} />,
      }} />
      <Tab.Screen name="Create" component={Settings} options={{
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

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="root" screenOptions={{
      headerStyle: { elevation: 0, shadowOpacity: 0, },
      headerTitleStyle: { alignSelf: 'center' },
      headerTitle: () => {
        return (
          <LogoText />
        )
      },
      headerLeft: () => {
        return (
          <CircularImage image={profile_default_image}
            style={null}
            size="small"
          />
        )
      },
      headerRight: () => {
        return (
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Icon name="search" size={25} color="#3e3b3b" />

          </TouchableOpacity>
        )
      },
    }}>
      <Stack.Screen name="splash" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="root" component={BottomNavigation} />
      <Stack.Screen name="auth" component={AuthNavigator} />
    </Stack.Navigator>
  )
}
