import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from '../../Styles';
import AddNew from '../../components/AddNew/AddNew';

const Image: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Image</Text>
            <AddNew />
        </SafeAreaView>
    )
}

export default Image;