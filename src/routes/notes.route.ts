import { Router } from "express";
import { insert } from "../controllers/notes.controller.js";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { noteBody } from "../schemas/note.schema.js";

const router: Router = Router();

router.post("/notes", validateBody(noteBody), insert);

export default router;
