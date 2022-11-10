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
export { insertNote };
