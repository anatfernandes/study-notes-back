import { Request, Response } from "express";
import { NewNote, NoteEntity } from "../protocols/Note.js";
import * as notesRepository from "../repositories/notes.repository.js";

async function insert(req: Request, res: Response) {
	const { title, text, subjectId } = req.body as NewNote;

	try {
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

async function listAll(req: Request, res: Response) {
	const user: number = res.locals.user;

	try {
		let notes: NoteEntity[] = await notesRepository.listAllNotes(user);

		notes = notes.map((note) => ({
			...note,
			title: note.title.trim(),
			text: note.text.trim(),
			subjectName: note.subjectName.trim(),
		}));

		res.status(200).send(notes);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function listAllFromSubject(req: Request, res: Response) {
	const user: number = res.locals.user;
	const id: number = Number(res.locals.subjectId);

	try {
		let notes: NoteEntity[] = await notesRepository.listAllNotesFromSubject(
			user,
			id
		);

		notes = notes.map((note) => ({
			...note,
			title: note.title.trim(),
			text: note.text.trim(),
			subjectName: note.subjectName.trim(),
		}));

		res.status(200).send(notes);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function edit(req: Request, res: Response) {
	const user: number = Number(res.locals.user);
	const id: number = Number(req.params.id);
	const { title, text, subjectId } = req.body as NewNote;

	if (isNaN(id) || id < 1) return res.sendStatus(400);

	try {
		const hasNote: boolean = await notesRepository.hasNote(id, user);

		if (!hasNote) {
			return res.status(404).send({ message: "Anotação inexistente." });
		}

		const editedNode: number = await notesRepository.editNote(
			{ title, text, subjectId },
			id
		);

		if (editedNode === 0) {
			return res
				.status(400)
				.send({ message: "Não foi possível editar anotação." });
		}

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { insert, listAll, listAllFromSubject, edit };
