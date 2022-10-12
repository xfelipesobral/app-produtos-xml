import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'

import Shield from '../../components/shield'

import { cacheProducts } from '../../cache'
import { syncProducts } from '../../sync/products'

import { IProduct } from '../../@types/models'

import { ddmmyyyy, diffDays } from '../../functions/data'

import { maskFloat } from '../../functions/masks'

const colors = {
    green: '#5ead33',
    orange: '#ff7a32',
    red: '#ff4332',
    itemSeparetor: '#efefef',
    date: '#4f4f4f'
}

function Products() {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        initScreen()
    }, [])

    const initScreen = async () => {
        setLoading(true)
        await syncProducts()
        const products = await cacheProducts.read() as IProduct[]

        setProducts(products)
        setLoading(false)
    }

    const isToday = (date: Date) => {
        const today = new Date()
        return date.getFullYear() === today.getFullYear() && date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
    }

    const moreThen15Days = (date: Date) => {
        const countDiffDays = diffDays(new Date(), date)
        return countDiffDays > 15
    }

    const renderProduct = ({ item: { id, description, valueSale, value, updatedAt }, index }: ListRenderItemInfo<IProduct>) => {
        const dateUpdated = new Date(updatedAt)
        let backgroundColor = isToday(dateUpdated) ? colors.green : colors.orange

        if (moreThen15Days(dateUpdated)) {
            backgroundColor = colors.red
        }

        return (
            <View style={style.item}>
                <View style={{ ...style.itemMark, backgroundColor }} />
                <View style={{ ...style.itemContent, borderTopWidth: index > 0 ? 1 : 0 }}>
                    <View style={{ flex: 1 }}> 
                        <Text>{id} - <Text style={{ fontWeight: 'bold' }}>{description}</Text></Text>
                        {!!updatedAt && <Text style={{ marginTop: 3, color: colors.date }}>{ddmmyyyy(dateUpdated)}</Text>}
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: colors.green, fontWeight: 'bold' }}>R$ {maskFloat(valueSale)}</Text>
                        <Text style={{ marginTop: 3, color: colors.date, fontSize: 12 }}>R$ {maskFloat(value)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <Shield title='Produtos'>
            <View style={{
                flex: 1
            }}>
                <FlatList
                    data={products}
                    keyExtractor={({ id }) => id}
                    refreshing={loading}
                    onRefresh={initScreen}
                    renderItem={renderProduct}
                />
            </View>
        </Shield>
    )
}

const style = StyleSheet.create({
    item: {
        flexDirection: 'row'
    },
    itemMark: {
        width: 10,
    },
    itemContent: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderColor: colors.itemSeparetor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Products