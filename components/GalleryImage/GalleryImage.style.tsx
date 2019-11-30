import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

interface Styles {
    imageWrapper: ViewStyle;
    image: ImageStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    imageWrapper: {
        width: props.width / 2,
        height: 500,
        maxHeight: props.height / 2,
        margin: 2,
        padding: 2,
        backgroundColor: '#eeeeee',
    },
    image: {
        flex: 1,
    }
});

export default getStyles;