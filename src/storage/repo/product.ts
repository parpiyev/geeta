import { IProduct } from "../../models/Product"

export interface IProductAllResponse {
    payloads: IProduct[]
    count: number
}

export interface ProductRepo {
    create(payload: IProduct): Promise<IProduct>
    update(query: Object, payload: IProduct): Promise<IProduct>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IProduct[]>
    findOne(query: Object): Promise<IProduct>
}