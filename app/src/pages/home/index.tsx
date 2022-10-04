import React from 'react'
import { View, Platform } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { SimpleLineIcons } from '@expo/vector-icons'

import Products from '../products'

const primaryColor = '#000000'

function Home() {
    const Tab = createMaterialTopTabNavigator()

    return (
        <View style={{ 
            flex: 1, 
            paddingBottom: Platform.OS === 'ios' ? 25 : 0, 
            backgroundColor: '#ffffff'
        }}>
            <Tab.Navigator
                tabBarPosition='bottom'
                showPageIndicator={false}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        

                        return <SimpleLineIcons name='basket' size={24} color={primaryColor} />
                    },
                    tabBarIndicator: () => (false),
                    tabBarShowLabel: false,
                })}
                style={{
                    backgroundColor: 'blue',
                }}
            >
                <Tab.Screen name='products' component={Products} />
            </Tab.Navigator>
        </View>
    )
}

export default Home