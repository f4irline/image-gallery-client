import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    scrollContainer: ViewStyle;
    imageWrapper: ViewStyle;
    image: ImageStyle;
    actionsContainer: ViewStyle;
    scoreContainer: ViewStyle;
    scoreLabel: TextStyle;
    commentsContainer: ViewStyle;
    commentsHeader: TextStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    scrollContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#353d4a'
    },
    imageWrapper: {},
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: props.width/props.height
    },
    actionsContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#222831'
    },
    scoreContainer: {
        flexDirection: 'row',
    },
    scoreLabel: {
        color: '#eeeeee',
        fontSize: 20,
        paddingHorizontal: 5,
    },
    commentsContainer: {
        flex: 1,
        backgroundColor: '#353d4a'
    },
    commentsHeader: {
        fontSize: 20,
        color: '#eeeeee',
    }
})

export default getStyles;