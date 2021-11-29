import path from "path"
import express, { Router } from "express"
import sampleRouter from "./sample"
import cotegoryRouter from "./category"
import productRouter from "./product"
import userRouter from "./user"

const router = Router({ mergeParams: true })

router.use('/api/file', express.static(path.join(__dirname, '../uploads')))
router.use("/sample", sampleRouter)
router.use("/category", cotegoryRouter)
router.use("/product", productRouter)
router.use("/user", userRouter)


export default router
