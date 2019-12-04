import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    loginContainer: ViewStyle;
    fieldsWrapper: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    fieldsWrapper: {
        marginBottom: 15,
    }
})

export default styles;