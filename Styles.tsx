import { StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface Style {
    viewContainer: ViewStyle;
    container: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Style> = {
    viewContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#2d4059'
    },
    container: {
        flex: 1,
        backgroundColor: '#2d4059',
        paddingStart: 5,
        paddingEnd: 5,
        padding: 5,
    }
}

export default styles;