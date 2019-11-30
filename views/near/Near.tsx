import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import AddNew from '../../components/AddNew/AddNew';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const Near: NavigationStackScreenComponent = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Near</Text>
            <AddNew />
        </SafeAreaView>
    )
}

Near.navigationOptions = {
    headerShown: false
}

export default Near;