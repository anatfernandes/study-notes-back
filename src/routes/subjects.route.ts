import { Router } from "express";
import { insert } from "../controllers/subjects.controller.js";

const router: Router = Router();

router.post("/subjects", insert);

export default router;
