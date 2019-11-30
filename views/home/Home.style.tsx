import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
    scrollContainer: ViewStyle,
    listsContainer: ViewStyle,
    imageList: ViewStyle,
}

const styles: StyleSheet.NamedStyles<Style> = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row',
        flex: 1
    },
    listsContainer: {
        flexDirection: 'row',
    },
    imageList: {
        flex: 1,
    },
})

export default styles;