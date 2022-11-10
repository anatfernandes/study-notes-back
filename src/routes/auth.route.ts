import { Router } from "express";
import { signup, signin, logout } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { validateSession } from "../middlewares/validateSession.middleware.js";
import * as authSchemas from "../schemas/auth.schema.js";

const router: Router = Router();

router.post("/sign-up", validateBody(authSchemas.signupBody), signup);
router.post("/sign-in", validateBody(authSchemas.signinBody), signin);

router.use(validateSession);

router.post("/logout", logout);

export default router;
