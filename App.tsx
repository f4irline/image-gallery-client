import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';
import store from './store/index';
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
                case 'Near You':
                    iconName = 'ios-compass';
                    break;
                default:
                    iconName = 'ios-person';
                    break;
            }

            return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
    }),
    tabBarOptions: {
        activeTintColor: '#ff5722',
        inactiveTintColor: '#fff',
        style: {
            backgroundColor: '#222831',
            borderTopWidth: 0,
        },
        labelStyle: {
            fontFamily: 'Rubik-Bold',
        }
    }
}

const routeConfigs = {
    'Home': AppNavigator,
    'Near You': NearView,
    'Profile': ProfileView
}

const TabNavigator = createBottomTabNavigator(
    routeConfigs,
    navigationOptions
)

const AppContainer = createAppContainer(TabNavigator);

const App = () => {

    const [ready, setReady] = useState(false);

    useEffect(() => {
        loadFonts();
    }, [])

    const loadFonts = async () => {
        await Font.loadAsync({
            'Rubik': require('./assets/fonts/Rubik-Regular.ttf'),
            'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
            'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf')
        });
        setReady(true);
    }

    return (
        <Provider store={store}>
            { ready ? <AppContainer /> : null }
        </Provider>
    )
}

export default App;