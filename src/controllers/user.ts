import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import { signToken } from "../middleware/auth"
import bcrypt from "bcrypt"

export class UserController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await storage.user.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                users
            }
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const user = await storage.user.create({ ...req.body, password: hashPassword })

        const token = await signToken(user._id, 'user')

        res.status(201).json({
            success: true,
            data: {
                token,
                user
            }
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = (await storage.user.find({ email: req.body.email }))[0]

        if (!user)
            return next(new AppError(401, `Email yoki parol no'to'rg'ri iltomos tekshirib qaytadan urinib ko'ring`))

        const password = await bcrypt.compare(req.body.password, user.password)

        if (!password)
            return next(new AppError(401, `Email yoki parol no'to'rg'ri iltomos tekshirib qaytadan urinib ko'ring`))

        const token = await signToken(user._id, 'user')

        res.status(201).json({
            success: true,
            data: {
                token,
                user
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals, _id = req.params.id;

        if (_id !== id)
            return next(new AppError(403, `Siz o'zingizni malumotlaringizni o'zgartira olasiz`))

        const user = await storage.user.update(_id, req.body)

        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals, _id = req.params.id;

        if (_id !== id)
            return next(new AppError(403, `Siz o'zingizni hisobingizni o'chira olasiz`))

        await storage.user.delete({ _id })

        const users = await storage.user.find(req.query)

        res.status(200).json({
            success: true,
            data: users
        })
    })
}
