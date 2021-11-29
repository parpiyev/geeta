import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class ProductValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        name: Joi.string().required(),
        category_id: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string()
    })

    updateSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number(),
        image: Joi.string(),
        description: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
