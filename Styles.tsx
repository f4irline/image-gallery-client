import { StatusBar, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Style {
    viewContainer: ViewStyle;
    container: ViewStyle;
    textInput: ViewStyle;
    inputLabel: TextStyle;
    emptyList: ViewStyle;
    emptyListText: TextStyle;
}

const styles: StyleSheet.NamedStyles<Style> = {
    viewContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#2d4059',
    },
    container: {
        flex: 1,
        backgroundColor: '#2d4059',
    },
    textInput: {
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderColor: '#c7c7c7',
        borderWidth: 1,
        borderRadius: 5,
        color: '#eeeeee',
    },
    inputLabel: {
        color: '#eeeeee',
        marginBottom: 5,
        fontFamily: 'Rubik-Bold',
    },
    emptyList: {
        padding: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListText: {
        fontFamily: 'Rubik-Bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: '#eeeeee',
    },
};

export default styles;
