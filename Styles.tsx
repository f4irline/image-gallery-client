import { StatusBar, StyleSheet, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle
}

const styles: StyleSheet.NamedStyles<Style> = {
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#2d4059'
    }
}

export default styles;