import { IUser } from "../../models/User"

export interface IUserAllResponse {
    payloads: IUser[]
    count: number
}

export interface UserRepo {
    create(payload: IUser): Promise<IUser>
    update(query: Object, payload: IUser): Promise<IUser>
    delete(query: Object): Promise<any>
    find(query: Object): Promise<IUser[]>
    findOne(query: Object): Promise<IUser>
}