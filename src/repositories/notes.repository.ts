import connection from "../database/studynotes.js";
import { NewNote, NoteEntity } from "../protocols/Note.js";

async function insertNote({
	title,
	text,
	subjectId,
}: NewNote): Promise<number> {
	return (
		await connection.query(
			`INSERT INTO
                notes
            (title, text, subject_id)
            VALUES ($1, $2, $3);`,
			[title, text, subjectId]
		)
	).rowCount;
}

async function listAllNotes(user: number): Promise<NoteEntity[]> {
	return (
		await connection.query(
			`SELECT
                notes.id,
                notes.title,
                notes.text,
                notes.subject_id AS "subjectId",
                subjects.name AS "subjectName",
                notes.created_at AS "createdAt",
                notes.edited_at AS "editedAt"
            FROM notes
            JOIN subjects
                ON notes.subject_id = subjects.id
            WHERE user_id = $1
            ORDER BY notes.id;`,
			[user]
		)
	)?.rows;
}

async function listAllNotesFromSubject(
	user: number,
	id: number
): Promise<NoteEntity[]> {
	return (
		await connection.query(
			`SELECT
                notes.id,
                notes.title,
                notes.text,
                notes.subject_id AS "subjectId",
                subjects.name AS "subjectName",
                notes.created_at AS "createdAt",
                notes.edited_at AS "editedAt"
            FROM notes
            JOIN subjects
                ON notes.subject_id = subjects.id
            WHERE user_id = $1
                AND subjects.id = $2
            ORDER BY notes.id;`,
			[user, id]
		)
	)?.rows;
}

async function hasNote(id: number, user: number): Promise<boolean> {
	return !!(
		await connection.query(
			`SELECT
				*
            FROM notes
            JOIN subjects
                ON notes.subject_id = subjects.id
            WHERE notes.id = $1
                AND subjects.user_id = $2;`,
			[id, user]
		)
	)?.rowCount;
}

async function editNote(
	{ title, text, subjectId }: NewNote,
	id: number
): Promise<number> {
	return (
		await connection.query(
			`UPDATE notes
            SET
                title = $1,
                text = $2,
                subject_id = $3,
                edited_at = $4
            WHERE id = $5;`,
			[title, text, subjectId, new Date(), id]
		)
	).rowCount;
}

export { insertNote, listAllNotes, listAllNotesFromSubject, hasNote, editNote };
