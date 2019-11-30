import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
    infoContainer: ViewStyle;
    scrollContainer: ViewStyle;
    header: TextStyle;
    image: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
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
        height: 100,
    }
})

export default styles;