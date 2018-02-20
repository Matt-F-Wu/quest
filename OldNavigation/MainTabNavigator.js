import React from 'react';
import { Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Compose from '../screens/Compose';
import Gallery from '../screens/Gallery';
import Profile from '../screens/Profile';
import Notification from '../screens/Notification';

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
    Notification: {
      screen: Notification,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused }) => {
        const { routeName } = navigation.state;
        var color_l = focused ? Colors.tabIconSelected : Colors.tabIconDefault;
        return (<Text style={{color: color_l, width: '100%', textAlign: 'center'}}>{routeName}</Text>);
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
            iconName = Platform.OS === 'ios' ? `ios-images${focused ? '' : '-outline'}` : 'md-image';
            break;
          case 'Profile':
            iconName =
              Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
            break;
          case 'Notification':
            iconName =
              Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications';
        }
        function renderNotif(routeName){
            if(routeName === 'Notification'){
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
            size={30}
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
