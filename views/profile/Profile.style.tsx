import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    profileContainer: ViewStyle;
    headerContainer: ViewStyle;
    helloContainer: ViewStyle;
    logoutText: TextStyle;
    greeting: TextStyle;
    name: TextStyle;
    tabsContainer: ViewStyle;
    tabContentContainer: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    profileContainer: {},
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#222831',
        padding: 10,
    },
    helloContainer: {
        flex: 1,
    },
    logoutText: {
        color: '#eeeeee',
    },
    greeting: {
        color: '#ff5722',
        fontFamily: 'Rubik-Bold',
        fontSize: 52,
    },
    name: {
        color: '#eeeeee',
        fontFamily: 'Rubik-Bold',
        fontSize: 48,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 30,
    },
    tabContentContainer: {
        flex: 1,
    },
});

export default styles;
