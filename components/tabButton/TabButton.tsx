import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './TabButton.style';

interface Props {
    label: string;
    onClick: () => void;
    isSelected?: boolean;
}

const TabButton = (props: Props) => {
    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer,
                props.isSelected ? styles.active : undefined,
            ]}
            onPress={props.onClick}>
            <Text style={styles.buttonText}>{props.label}</Text>
        </TouchableOpacity>
    );
};

export default TabButton;
