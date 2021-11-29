import { Router } from "express"
import upload from "../middleware/multer"
import { authMiddleware } from "../middleware/auth"
import { ProductController } from "../controllers/product"
import { ProductValidator } from "../validators/product"

const router = Router({ mergeParams: true })
const controller = new ProductController()
const validator = new ProductValidator()

router.route("/all").get(authMiddleware('user'), controller.getAll)
router.route("/create").post(authMiddleware('user'), upload(['image/jpeg', 'image/png'], 10).single('photo'), validator.create, controller.create)
router
    .route("/:id")
    .get(authMiddleware('user'), controller.get)
    .patch(authMiddleware('user'), validator.update, controller.update)
    .delete(authMiddleware('user'), controller.delete)

export default router
