import { StatusBar, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Style {
    viewContainer: ViewStyle;
    container: ViewStyle;
    textInput: ViewStyle;
    inputLabel: TextStyle;
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
    },
    inputLabel: {
        color: '#eeeeee',
        marginBottom: 5,
    }
}

export default styles;