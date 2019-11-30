import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import AddNew from '../../components/AddNew/AddNew';

const Near: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Near</Text>
            <AddNew />
        </SafeAreaView>
    )
}

export default Near;