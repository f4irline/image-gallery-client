import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeView from './views/home/Home';
import ImageView from './views/image/Image';
import NearView from './views/near/Near';
import ProfileView from './views/profile/Profile';

const AppNavigator = createStackNavigator(
    {
        Home: HomeView,
        Image: ImageView,
    },
    {
        initialRouteName: 'Home'
    }
)

const navigationOptions = {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
            const { routeName } = navigation.state;
            const IconComponent = Ionicons;

            let iconName: string;
            switch (routeName) {
                case 'Home':
                    iconName = 'ios-home';
                    break;
                default:
                    iconName = 'ios-person';
                    break;
            }

            return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
    }),
    tabBarOptions: {
        activeTintColor: '#ff9933',
        inactiveTintColor: '#000',
    }    
}

const routeConfigs = {
    Home: AppNavigator,
    Near: NearView,
    Profile: ProfileView
}

const TabNavigator = createBottomTabNavigator(
    routeConfigs,
    navigationOptions
)

export default createAppContainer(TabNavigator);