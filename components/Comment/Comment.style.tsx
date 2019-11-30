import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    container: ViewStyle;
    commentWrapper: ViewStyle;
    author: TextStyle;
    comment: TextStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#222831',
        borderBottomWidth: 2,
        paddingBottom: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    commentWrapper: {
        flex: 1,
    },
    author: {
        fontFamily: 'Rubik-Bold',
        color: '#c7c7c7',
        marginBottom: 10,
    },
    comment: {
        fontFamily: 'Rubik',
        color: '#eeeeee'
    }
})

export default styles;