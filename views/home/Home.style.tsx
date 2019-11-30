import { StyleSheet, ViewStyle } from 'react-native';

interface Style {
    imageList: ViewStyle,
}

const styles: StyleSheet.NamedStyles<Style> = StyleSheet.create({
    imageList: {
        flex: 1,
    },
})

export default styles;