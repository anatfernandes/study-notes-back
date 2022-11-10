import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import { validateSubject } from "../middlewares/validateSubject.js";
import { noteBody } from "../schemas/note.schema.js";
import {
	deleteNote,
	edit,
	insert,
	listAll,
	listAllFromSubject,
} from "../controllers/notes.controller.js";

const router: Router = Router();

router.post("/notes", validateBody(noteBody), validateSubject("body"), insert);
router.get("/notes", listAll);

router.get(
	"/subjects/:id/notes",
	validateSubject("params"),
	listAllFromSubject
);

router.put("/notes/:id", validateBody(noteBody), validateSubject("body"), edit);
router.delete("/notes/:id", deleteNote);

export default router;
