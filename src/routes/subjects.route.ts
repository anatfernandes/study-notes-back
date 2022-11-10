import { Router } from "express";
import { insert, listAll, edit } from "../controllers/subjects.controller.js";

const router: Router = Router();

router.post("/subjects", insert);
router.get("/subjects", listAll);
router.put("/subjects/:id", edit);

export default router;
