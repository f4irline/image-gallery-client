import { StyleSheet, ViewStyle, ImageStyle, Platform } from 'react-native';

interface Styles {
    uploadContainer: ViewStyle;
    imageWrapper: ViewStyle;
    image: ImageStyle;
    fieldsWrapper: ViewStyle;
    field: ViewStyle;
}

interface Props {
    height: number;
    width: number;
}

const getStyles = (props: Props) => StyleSheet.create<Styles>({
    uploadContainer: {
        flex: 1,
        paddingStart: 10,
        paddingEnd: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    imageWrapper: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 5,
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        aspectRatio: props.width/props.height
    },
    fieldsWrapper: {
        marginTop: 20,
        justifyContent: 'flex-end',
    },
    field: {
        marginBottom: 10,
    }
})

export default getStyles;