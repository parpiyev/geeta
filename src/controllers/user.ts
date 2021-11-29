import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

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
        const user = await storage.user.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                user
            }
        })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.findOne({ _id: req.params.id })

        res.status(201).json({
            success: true,
            data: {
                user
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.user.delete(req.params.id)

        const users = await storage.user.find(req.query)

        res.status(200).json({
            success: true,
            data: users
        })
    })
}
