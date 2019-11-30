import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    infoContainer: ViewStyle;
    scrollContainer: ViewStyle;
    header: TextStyle;
    author: TextStyle;
    image: ImageStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    infoContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ff5722',
        paddingBottom: 5,
        marginBottom: 5,
    },
    scrollContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        fontSize: 25,
        color: '#eeeeee',
    },
    author: {
        fontSize: 12,
        color: '#c7c7c7',
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: props.width/props.height
    }
})

export default getStyles;