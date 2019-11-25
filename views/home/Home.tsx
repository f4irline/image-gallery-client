import React from 'react';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { View, Text } from 'react-native';

import styles from '../../Styles';

interface Props extends NavigationStackScreenProps {}

const Home: NavigationStackScreenComponent<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;