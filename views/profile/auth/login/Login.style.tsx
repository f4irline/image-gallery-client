import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
    loginContainer: ViewStyle;
    fieldsWrapper: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        paddingStart: 15,
        paddingEnd: 15,
    },
    fieldsWrapper: {
        marginBottom: 15,
    },
});

export default styles;
