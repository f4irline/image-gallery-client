import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    scrollContainer: ViewStyle;
    imageWrapper: ViewStyle;
    descriptionWrapper: ViewStyle;
    descriptionText: TextStyle;
    image: ImageStyle;
    actionsContainer: ViewStyle;
    scoreContainer: ViewStyle;
    scoreLabel: TextStyle;
    commentsContainer: ViewStyle;
    commentsHeaderContainer: ViewStyle;
    commentsHeader: TextStyle;
    sendWrapper: ViewStyle;
    commentInput: ViewStyle;
    sendIcon: ViewStyle;
    voteButton: ViewStyle;
}

interface Props {
    height: number;
    width: number;
    noToken: boolean;
}

const getStyles = (props: Props) =>
    StyleSheet.create<Styles>({
        scrollContainer: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#353d4a',
        },
        imageWrapper: {},
        image: {
            flex: 1,
            width: '100%',
            height: undefined,
            aspectRatio: props.height / props.width,
        },
        descriptionWrapper: {
            backgroundColor: '#222831',
            paddingTop: 5,
            paddingBottom: 10,
            paddingHorizontal: 5,
            borderBottomColor: '#eeeeee',
            borderBottomWidth: 1,
        },
        descriptionText: {
            color: '#eeeeee',
            fontSize: 14,
            fontFamily: 'Rubik',
        },
        actionsContainer: {
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#222831',
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
            padding: 5,
            flex: 1,
            backgroundColor: '#353d4a',
        },
        commentsHeaderContainer: {
            borderBottomColor: '#ff5722',
            borderBottomWidth: 2,
            paddingBottom: 5,
            marginBottom: 5,
        },
        commentsHeader: {
            fontSize: 20,
            color: '#eeeeee',
            fontFamily: 'Rubik',
        },
        sendWrapper: {
            padding: 5,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#353d4a',
        },
        commentInput: {
            flex: 1,
            marginRight: 10,
        },
        sendIcon: {
            marginRight: 10,
        },
        voteButton: {
            opacity: props.noToken ? 0.3 : 1,
        },
    });

export default getStyles;
