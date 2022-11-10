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

export { insertNote, listAllNotes };
