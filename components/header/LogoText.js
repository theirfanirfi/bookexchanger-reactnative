import React from 'react';
import { Text } from 'react-native'
import colors from '../../constants/colors'

export default function LogoText() {
    return (
        <Text
            style={{
                alignSelf: 'center', color: '#3e3b3b',
                fontSize: 26,

                fontFamily: 'BerkshireSwash-Regular'
            }}
        >BookExchange</Text>
    )
}