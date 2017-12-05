import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Compose from '../screens/Compose';
import Gallery from '../screens/Gallery';
import Profile from '../screens/Profile';

export default TabNavigator(
  {
    Compose: {
      screen: Compose,
    },
    Gallery: {
      screen: Gallery,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused }) => {
        const { routeName } = navigation.state;
        var color_l = focused ? Colors.tabIconSelected : Colors.tabIconDefault;
        return (<Text style={{color: color_l}}>{routeName}</Text>);
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Compose':
            iconName =
              Platform.OS === 'ios'
                ? `ios-create${focused ? '' : '-outline'}`
                : 'md-create';
            break;
          case 'Gallery':
            iconName = Platform.OS === 'ios' ? `ios-mail${focused ? '' : '-outline'}` : 'md-mail';
            break;
          case 'Profile':
            iconName =
              Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
        }
        function renderNotif(routeName){
            if(routeName === 'Profile'){
              return (
                <Text style={{color: 'red', 'fontWeight': 'bold', fontSize: 24}}>2</Text>
              );
            }else{
              return <View />;
            }
        };
        return (
          <View style={{flexDirection: 'row', justifyContent: 'center', width: '20%'}}>
          <Ionicons
            name={iconName}
            size={32}
            style={{ marginBottom: -3}}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
          {renderNotif(routeName)}
          </View>
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
