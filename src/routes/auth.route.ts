import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import * as authSchemas from '../schemas/auth.schema.js';

const router: Router = Router();

router.post('/sign-up', validateBody(authSchemas.signupBody), signup);
router.post('/sign-in', validateBody(authSchemas.signinBody), signin);

export default router;