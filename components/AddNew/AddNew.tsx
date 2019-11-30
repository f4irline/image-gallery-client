import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons as IconComponent } from '@expo/vector-icons';

import addNewStyles from './AddNew.style';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
    navigation?: NavigationStackProp
}

const AddNew: React.FC<Props> = (props: Props) => {
    const { navigation } = props;
    return (
        <TouchableOpacity 
            style={addNewStyles.addWrapper}
            onPress={() => navigation.navigate('Upload')}>
            <IconComponent style={addNewStyles.icon} name={'ios-add'} color={'#ff5722'}/>
        </TouchableOpacity>
    )
}

export default AddNew;