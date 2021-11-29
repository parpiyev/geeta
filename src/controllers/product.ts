import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

export class ProductController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const products = await storage.product.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                products
            }
        })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                product
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                product
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.update({ _id: req.params.id }, req.body)

        res.status(200).json({
            success: true,
            data: {
                product
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.product.delete({ _id: req.params.id })

        const products = await storage.product.find(req.query)

        res.status(200).json({
            success: true,
            data: { products }
        })
    })
}
