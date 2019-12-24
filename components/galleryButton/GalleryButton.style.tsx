import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    buttonContainer: ViewStyle;
    disabled: ViewStyle;
    buttonTitle: TextStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff5722',
        borderRadius: 2,
        padding: 8,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    disabled: {
        opacity: 0.5,
    },
    buttonTitle: {
        fontFamily: 'Rubik-Bold',
        color: '#eeeeee',
        fontSize: 14,
        textTransform: 'uppercase',
    }
})

export default styles;