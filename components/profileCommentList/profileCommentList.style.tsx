import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    commentList: ViewStyle;
}

const styles: StyleSheet.NamedStyles<Styles> = StyleSheet.create<Styles>({
    commentList: {
        flex: 1,
    },
});

export default styles;
