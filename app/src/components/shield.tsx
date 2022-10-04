import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'

type Props = {
    title: string
    children: React.ReactNode
    return: boolean
}

class Shield extends React.Component<Props> {

    render(): React.ReactNode {
        
        return(
            <View style={style.container}>

                <View>
                    {this.props.children}
                </View>
            </View>
        )
    }
}

const style = {
    container: {
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 25 : 0,
        backgroundColor: '#eeeeee'
    }
}