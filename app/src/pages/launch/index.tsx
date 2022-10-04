import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { NavigationProps } from '../../routes'

function Launch() {
    const navigation = useNavigation<NavigationProps>()

    useEffect(() => {
        navigation.replace('home', {})
    }, [])
    
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
}

export default Launch