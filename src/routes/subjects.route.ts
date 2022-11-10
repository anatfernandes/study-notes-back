import { Router } from "express";
import { insert, listAll } from "../controllers/subjects.controller.js";

const router: Router = Router();

router.post("/subjects", insert);
router.get("/subjects", listAll);

export default router;
