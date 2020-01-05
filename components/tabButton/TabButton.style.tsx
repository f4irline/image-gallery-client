import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    buttonContainer: ViewStyle;
    active: ViewStyle;
    buttonText: TextStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    buttonContainer: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#c7c7c7',
        backgroundColor: '#353d4a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#eeeeee',
        textTransform: 'uppercase',
        fontFamily: 'Rubik-Bold',
    },
    active: {
        borderColor: '#ff5722',
    },
});

export default styles;
