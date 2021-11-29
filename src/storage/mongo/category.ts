import { CategoryRepo, ICategoryAllResponse } from "../repo/category"
import Category, { ICategory } from "../../models/Category"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class CategoryStorage implements CategoryRepo {
    private scope = "storage.category"

    async find(query: Object): Promise<ICategory[]> {
        try {
            const categorys = await Category.find(query)

            return categorys
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<ICategory> {
        try {
            const category = await Category.findOne(query)

            if (!category) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Category is not found")
            }

            return category
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: ICategory): Promise<ICategory> {
        try {
            const category = await Category.create(payload)

            return category
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(query: Object, payload: ICategory): Promise<ICategory> {
        try {
            const category = await Category.findOneAndUpdate(query, payload, {
                new: true
            })

            if (!category) {
                logger.warn(`${this.scope}.update failed to findOneAndUpdate`)
                throw new AppError(404, "Category is not found")
            }

            return category
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(query: Object): Promise<any> {
        try {
            const category = await Category.findOneAndDelete(query)

            if (!category) {
                logger.warn(`${this.scope}.delete failed to findOneAndDelete`)
                throw new AppError(404, "Category is not found")
            }

            return category
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
