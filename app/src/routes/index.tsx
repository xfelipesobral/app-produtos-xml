import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import Home from '../pages/home'
import Launch from '../pages/launch'

const Stack = createStackNavigator()

type StackParamList = {
    launch: {}
    home: {}
}

type NavigationProps = StackNavigationProp<StackParamList>

function Routes() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='launch' component={Launch} />
                <Stack.Screen name='home' component={Home} />
            </Stack.Navigator>
            <StatusBar style='dark' />
        </NavigationContainer>
    )
}

export {
    NavigationProps,
    Routes
} 