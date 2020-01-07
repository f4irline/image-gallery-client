import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    wrapper: ViewStyle;
    wrapperOdd: ViewStyle;
    commentInfoWrapper: ViewStyle;
    imageInfoWrapper: ViewStyle;
    commentInfo: TextStyle;
    imageTitle: TextStyle;
    imageAuthor: TextStyle;
    dateWrapper: ViewStyle;
    date: TextStyle;
    actionsWrapper: ViewStyle;
    enterWrapper: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    wrapper: {
        flexDirection: 'row',
        padding: 5,
        flex: 1,
        backgroundColor: '#353d4a',
        borderBottomWidth: 2,
        borderBottomColor: '#eeeeee',
    },
    wrapperOdd: {
        backgroundColor: '#222831',
    },
    commentInfoWrapper: {
        flex: 1,
    },
    imageInfoWrapper: {
        paddingBottom: 5,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ff5722',
    },
    commentInfo: {
        color: '#eeeeee',
        fontFamily: 'Rubik',
    },
    imageTitle: {
        fontSize: 18,
        fontFamily: 'Rubik-Bold',
    },
    imageAuthor: {
        fontFamily: 'Rubik-Light',
    },
    dateWrapper: {
        paddingTop: 5,
        flex: 1,
        alignSelf: 'flex-end',
    },
    date: {
        fontFamily: 'Rubik-Light',
        fontSize: 12,
    },
    actionsWrapper: {
        padding: 5,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    enterWrapper: {},
});

export default styles;
