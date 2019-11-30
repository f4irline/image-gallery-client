import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface Styles {
    imageWrapper: ViewStyle;
    infoWrapper: ViewStyle,
    author: TextStyle;
    touchableWrapper: ViewStyle;
    touchable: ViewStyle;
    image: ImageStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    imageWrapper: {
        flex: 1,
        height: 500,
        maxHeight: props.height / 2,
        backgroundColor: '#222831',
        margin: 2,
        padding: 3,
        borderWidth: 2,
        borderColor: '#eeeeee',
    },
    infoWrapper: {
        flex: 1,
        height: '90%',
    },
    author: {
        fontFamily: 'Rubik-Light',
        color: '#eeeeee',
        padding: 5
    },
    touchableWrapper: {
        height: '90%',
        width: '100%'
    },
    touchable: {
        height: '100%',
        width: '100%',
    },
    image: {
        flex: 1,
    }
});

export default getStyles;