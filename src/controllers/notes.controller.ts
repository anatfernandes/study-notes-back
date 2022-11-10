import { Request, Response } from "express";
import { NewNote, NoteEntity } from "../protocols/Note.js";
import { SubjectEntity } from "../protocols/Subject.js";
import * as notesRepository from "../repositories/notes.repository.js";
import * as subjectsRepository from "../repositories/subjects.repository.js";

async function insert(req: Request, res: Response) {
	const user: number = res.locals.user;
	const { title, text, subjectId } = req.body as NewNote;

	try {
		const subject: SubjectEntity | undefined =
			await subjectsRepository.findSubjectById(subjectId, user);

		if (!subject) {
			return res.status(404).send({ message: "Tópico não encontrado." });
		}

		const insertedNote: number = await notesRepository.insertNote({
			title,
			text,
			subjectId,
		});

		if (insertedNote === 0) {
			return res.status(400).send({ message: "Não foi possível criar nota." });
		}

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { insert };
