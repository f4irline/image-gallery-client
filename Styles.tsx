import { StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface Style {
    viewContainer: ViewStyle;
    container: ViewStyle;
    textInput: ViewStyle;
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
    },
    textInput: {
        padding: 3,
        borderColor: '#c7c7c7',
        borderWidth: 1,
        borderRadius: 5,
        color: '#eeeeee'
    }
}

export default styles;