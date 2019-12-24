import { StyleSheet, ViewStyle, StatusBar, TextStyle, Dimensions } from 'react-native';

interface Styles {
    headerContainer: ViewStyle;
    actionContainer: ViewStyle;
    titleContainer: ViewStyle;
    title: TextStyle;
    subtitle: TextStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        width: Dimensions.get('window').width,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#222831'
    },
    actionContainer: {
        padding: 10,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
    },
    title: {
        color: '#eeeeee',
        fontSize: 18,
        fontFamily: 'Rubik'
    },
    subtitle: {
        color: '#c7c7c7',
        fontSize: 12,
        fontFamily: 'Rubik'
    }
})

export default styles;