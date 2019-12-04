import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    profileContainer: ViewStyle;
    headerContainer: ViewStyle;
    greeting: TextStyle;
    name: TextStyle;
    tabsContainer: ViewStyle;
    tabContentContainer: ViewStyle;
    imageList: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    profileContainer: {
    },
    headerContainer: {
        backgroundColor: '#222831',
        padding: 10,
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
        height: 30
    },
    tabContentContainer: {
        flex: 1,
    },
    imageList: {
        flex: 1,
    }
})

export default styles;