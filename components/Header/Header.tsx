import React from 'react';
import { Platform, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons as MaterialIcon, Ionicons as IonIcon } from '@expo/vector-icons';
import { HeaderProps } from 'react-navigation-stack';

import headerStyles from './Header.style';

interface Props {
    headerProps: HeaderProps;
    title: string;
    subtitle?: string;
}

const Header: React.FC<Props> = (props: Props) => {
    const { headerProps, title, subtitle } = props;
    const isIos = Platform.OS === 'ios';
    return (
        <SafeAreaView style={headerStyles.headerContainer}>
            <TouchableOpacity style={headerStyles.actionContainer} onPress={() => headerProps.navigation.pop()}>
                { isIos ? <IonIcon name={'ios-arrow-back'} size={25} color={'#eeeeee'}/> : <MaterialIcon size={25} name={'arrow-back'} color={'#eeeeee'}/>  }
            </TouchableOpacity>
            <View style={headerStyles.titleContainer}>
                <Text style={headerStyles.title}>{title}</Text>
                { subtitle ? <Text style={headerStyles.subtitle}>{subtitle}</Text> : undefined }
            </View>
        </SafeAreaView>
    )
}

export default Header;