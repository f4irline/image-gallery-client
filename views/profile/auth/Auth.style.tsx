import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    authContainer: ViewStyle;
    headerContainer: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        paddingStart: 15,
        paddingEnd: 15,
    },
    headerContainer: {
        marginBottom: 15,
    },
    title: {
        fontFamily: 'Rubik-Bold',
        fontSize: 28,
        color: '#ff5722'
    },
    subtitle: {
        fontSize: 18,
        color: '#eeeeee'
    }
})

export default styles;