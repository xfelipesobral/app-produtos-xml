import { IProduct, IProductInterface } from './interface'
import { PrismaClient } from '@prisma/client'

import Error from '@shared/Error'

class ProductModel implements IProductInterface {
    private prisma = new PrismaClient().product

    async create({ id, description, value, valueSale }: IProduct): Promise<string> {
        const productAlreadyExists = await this.findById(id)
        
        if (productAlreadyExists) {
            throw new Error('Product already exists')
        }

        await this.prisma.create({ 
            data: {
                id,
                value,
                description,
                valueSale
            } 
        })

        return id
    }

    async update({ id, description, value }: IProduct): Promise<string> {
        const productAlreadyExists = await this.findById(id)    

        if (!productAlreadyExists) {
            throw new Error('Product not exists')
        }

        await this.prisma.update({
            where: { id },
            data: {
                description,
                value,
                updatedAt: new Date()
            }
        })

        return id
    }

    findById(id: string): Promise<IProduct> {
        return this.prisma.findUnique({
            where: { id }
        })    
    }

    findAll(): Promise<IProduct[]> {
        return this.prisma.findMany()
    }

    async sync(product: IProduct): Promise<string> {
        try {
            return await this.create(product)
        } catch {
            return await this.update(product)
        }
    }
}

export default ProductModel