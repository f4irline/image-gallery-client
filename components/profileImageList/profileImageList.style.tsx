import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    imageList: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    imageList: {
        flex: 1,
    },
});

export default styles;
