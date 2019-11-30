import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    addWrapper: ViewStyle,
    icon: ViewStyle,
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    addWrapper: {
        position: 'absolute',
        bottom: 7,
        right: 7,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#eeeeee',
        backgroundColor: '#2d4059',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 50
    }
})

export default styles;