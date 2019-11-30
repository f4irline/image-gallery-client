import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface Styles {
    imageWrapper: ViewStyle;
    author: TextStyle,
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
    author: {
        fontFamily: 'Rubik-Light',
        color: '#eeeeee',
        padding: 5
    },
    image: {
        flex: 1,
    }
});

export default getStyles;