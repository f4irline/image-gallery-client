import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

interface Styles {
    uploadContainer: ViewStyle;
    imageWrapper: ViewStyle;
    image: ImageStyle;
    fieldsWrapper: ViewStyle;
    titleField: ViewStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    uploadContainer: {
        flex: 1,
        padding: 10,
    },
    imageWrapper: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 5,
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: props.width/props.height
    },
    fieldsWrapper: {
        paddingTop: 20,
        justifyContent: 'flex-end',
    },
    titleField: {
        marginBottom: 5,
    }
})

export default getStyles;