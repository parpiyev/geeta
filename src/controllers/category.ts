import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

export class CategoryController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const categorys = await storage.category.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                categorys
            }
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const category = await storage.category.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                category
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const category = await storage.category.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                category
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const category = await storage.category.update({ _id: req.params.id }, req.body)

        res.status(200).json({
            success: true,
            data: {
                category
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.category.delete({ _id: req.params.id })

        const categorys = await storage.category.find(req.query)

        res.status(200).json({
            success: true,
            data: { categorys }
        })
    })
}
