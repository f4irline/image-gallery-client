import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    overlay: ViewStyle;
    wrapper: ViewStyle;
    loadingIndicator: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        backgroundColor: '#00000080',
    },
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingIndicator: {
        flex: 1,
        alignSelf: 'center',
        zIndex: 101,
    },
});

export default styles;
