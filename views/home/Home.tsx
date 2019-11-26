import React from 'react';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';

interface Props extends NavigationStackScreenProps {}

const Home: NavigationStackScreenComponent<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

Home.navigationOptions = {
    headerShown: false
}

export default Home;