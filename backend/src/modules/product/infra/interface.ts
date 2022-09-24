interface IProduct {
    id: string
    description: string
    value: number
    valueSale: number
}

interface IProductInterface {
    create(product: IProduct): Promise<string>
    update(product: IProduct): Promise<string>
    findById(id: string): Promise<IProduct>
    findAll(): Promise<Array<IProduct>>
    sync(product: IProduct): Promise<string>
}

export { IProduct, IProductInterface }
