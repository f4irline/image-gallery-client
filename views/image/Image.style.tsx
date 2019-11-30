import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    infoContainer: ViewStyle;
    scrollContainer: ViewStyle;
    header: TextStyle;
    image: ImageStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    infoContainer: {},
    scrollContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        fontSize: 25,
        color: '#eeeeee',
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: props.width/props.height
    }
})

export default getStyles;