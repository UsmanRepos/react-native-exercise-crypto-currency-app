import { View, Text, Image } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'
import { Home, CryptoDetail, Transaction } from '../screens'
import { LinearGradient } from 'expo-linear-gradient'
import { TabBarIcon, TabBarButton } from '../components'

const stack = createNativeStackNavigator()
const tab = createBottomTabNavigator()

const tabs = () => (
  <tab.Navigator
    tabBarOptions={{ showLabel: false }}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        height: 100,
        borderTopColor: "transparent",
        backgroundColor: COLORS.white,
      }
    })}
  >
    <tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon icon={icons.home} label="HOME" focused={focused} />
        )
      }}
    />
    <tab.Screen
      name='Portfolio'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon icon={icons.pie_chart} label="PORTFOLIO" focused={focused} />
        )
      }}
    />
    <tab.Screen
      name='Transaction'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.transaction}
            resizeMode='contain'
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        ),
        tabBarButton: ( props ) => (
          <TabBarButton {...props} />
        ),
      }}
    />
    <tab.Screen
      name='Prices'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon icon={icons.line_graph} label="PRICES" focused={focused} />
        )
      }}
    />
    <tab.Screen
      name='Settings'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabBarIcon icon={icons.settings} label="SETTING" focused={focused} />
        )
      }}
    />
  </tab.Navigator >
);
const stackSccreen = () => (
  <stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    initialRouteName='home'
  >
    <stack.Screen
      name='home'
      component={tabs}
    />
    <stack.Screen
      name='cryptoDetail'
      component={CryptoDetail}
    />
    <stack.Screen
      name='transaction'
      component={Transaction}
    />
  </stack.Navigator>
)
const Index = () => {
  return (
    <NavigationContainer >
      {stackSccreen()}
    </NavigationContainer>
  );
};

export default Index;
