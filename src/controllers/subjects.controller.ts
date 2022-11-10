import { Request, Response } from "express";
import { Subject, SubjectEntity } from "../protocols/Subject.js";
import * as subjectsRepository from "../repositories/subjects.repository.js";

async function insert(req: Request, res: Response) {
	const user: number = res.locals.user;
	const { name } = req.body as Subject;

	if (!name || typeof name !== "string") {
		return res.status(400).send({ message: "O nome do tópico é inválido." });
	}

	try {
		const hasSubject: SubjectEntity | undefined =
			await subjectsRepository.findSubject({
				user,
				name,
			});

		if (hasSubject) {
			return res.status(409).send({ message: "Esse tópico já existe." });
		}

		const insertedSubject: number = await subjectsRepository.insertSubject({
			user,
			name,
		});

		if (insertedSubject === 0) {
			return res
				.status(400)
				.send({ message: "Não foi possível criar o tópico." });
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
		let subjects: SubjectEntity[] = await subjectsRepository.listAllSubjects(
			user
		);

		subjects = subjects.map((subject) => ({
			...subject,
			name: subject.name.trim(),
		}));

		res.status(200).send(subjects);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function edit(req: Request, res: Response) {
	const user: number = res.locals.user;
	const { name } = req.body as Subject;
	const id: number | null = Number(req.params.id) || null;

    if (!id || id < 1) return res.sendStatus(400);

	if (!name || typeof name !== "string") {
		return res.status(400).send({ message: "O nome do tópico é inválido." });
	}

	try {
		const hasSubject: SubjectEntity | undefined =
			await subjectsRepository.findSubjectById(id);

		if (!hasSubject) {
			return res.status(404).send({ message: "Tópico não encontrado." });
		}

		const hasSubjectName: SubjectEntity | undefined =
			await subjectsRepository.findSubject({
				user,
				name,
			});

		if (hasSubjectName) {
			return res.status(409).send({ message: "Esse tópico já existe." });
		}

		const editedSubject: number = await subjectsRepository.edit({
			user,
			name,
			id,
		});

		if (editedSubject === 0) {
			return res
				.status(400)
				.send({ message: "Não foi possível editar tópico." });
		}

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { insert, listAll, edit };
