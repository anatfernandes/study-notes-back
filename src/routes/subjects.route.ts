import { Router } from "express";
import { validateSubject } from "../middlewares/validateSubject.js";
import {
	insert,
	listAll,
	edit,
	deleteSubject,
} from "../controllers/subjects.controller.js";

const router: Router = Router();

router.post("/subjects", insert);
router.get("/subjects", listAll);
router.put("/subjects/:id", validateSubject("params"), edit);
router.delete("/subjects/:id", validateSubject("params"), deleteSubject);

export default router;
