import { StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle
}

const styles: StyleSheet.NamedStyles<Style> = {
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        paddingStart: 10,
        padding: 10,
    }
}

export default styles;