import { Router } from "express"
import { authMiddleware } from "../middleware/auth"
import { UserController } from "../controllers/user"
import { UserValidator } from "../validators/user"

const router = Router({ mergeParams: true })
const controller = new UserController()
const validator = new UserValidator()

router.route("/all").get(authMiddleware('user'), controller.getAll)
router.route("/create").post(validator.create, controller.create)
router.route("/login").post(validator.login, controller.login)
router
    .route("/:id")
    .get(authMiddleware('user'), controller.get)
    .patch(authMiddleware('user'), validator.update, controller.update)
    .delete(authMiddleware('user'), controller.delete)

export default router