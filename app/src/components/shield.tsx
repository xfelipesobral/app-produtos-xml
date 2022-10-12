import React from 'react'
import { Platform, View, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants'

type Props = {
    title: string
    children: React.ReactNode
    return?: boolean
}

function Shield({ title, children }: Props) {

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={{ fontSize: 24 }}>{title}</Text>
            </View>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </View>
    )
}

export default Shield

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6'
    },
    header: {
        backgroundColor: '#ffffff',
        padding: 15,
        paddingTop: Constants.statusBarHeight,
        borderBottomWidth: 1,
        borderColor: '#efefef',
        alignItems: 'center'
    }
})