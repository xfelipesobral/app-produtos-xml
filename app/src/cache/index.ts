import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ICacheBase {
    type: string
    value: any
}

class CacheManager {
    private storage: string

    constructor(name: string) {
        this.storage = name
    }

    async write(content: any) {
        const base: ICacheBase = {
            type: typeof content,
            value: content
        }

        await AsyncStorage.setItem(this.storage, JSON.stringify(base))
    }

    async read() {
        const data = await AsyncStorage.getItem(this.storage)

        if (!data) return ''

        const { value } = JSON.parse(data) as ICacheBase

        return value
    }

    remove() {
        return AsyncStorage.removeItem(this.storage)
    }
}

export const cacheProducts = new CacheManager('PRODUCTS')