import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { storage } from '../storage/main'

type DecodedToken = {
    id: string
    user_ip: string
    role: string
    iat: number
}

export const signToken = async (id: string, role: string): Promise<string> => {
    return jwt.sign({ id, role }, config.JwtSecret)
}

export const decodeToken = async (token: string): Promise<DecodedToken> => {
    const decoded = (await jwt.verify(token, config.JwtSecret)) as DecodedToken
    return decoded
}

export const authMiddleware = (user_role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization

        if (!token || typeof token === null || typeof token === undefined)
            return next(new AppError(401, 'Iltimos tizimga qayta kiring'))

        const decoded = decodeToken(token)
        const role = (await decoded).role

        if (role !== user_role)
            return next(new AppError(401, 'Sizga ruhsat berilmagan'))

        const user = (await storage.user.find({ _id: (await decoded).id }))[0]

        if (!user)
            return next(new AppError(401, 'Tizimga kirishdan avval royhatdan o\'ting'))

        res.locals.id = (await decoded).id
        res.locals.role = (await decoded).role

        next()
    }
}
