import { Router } from "express"
import { authMiddleware } from "../middleware/auth"
import { CategoryController } from "../controllers/category"
import { CategoryValidator } from "../validators/category"

const router = Router({ mergeParams: true })
const controller = new CategoryController()
const validator = new CategoryValidator()

router.route("/all").get(authMiddleware('user'), controller.getAll)
router.route("/create").post(authMiddleware('user'), validator.create, controller.create)
router
    .route("/:id")
    .get(authMiddleware('user'), controller.get)
    .patch(authMiddleware('user'), validator.update, controller.update)
    .delete(authMiddleware('user'), controller.delete)

export default router