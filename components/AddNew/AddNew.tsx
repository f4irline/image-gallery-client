import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons as IconComponent } from '@expo/vector-icons';

import addNewStyles from './AddNew.style';

const AddNew = () => {
    return (
        <TouchableOpacity style={addNewStyles.addWrapper}>
            <IconComponent style={addNewStyles.icon} name={'ios-add'} color={'#ff5722'}/>
        </TouchableOpacity>
    )
}

export default AddNew;