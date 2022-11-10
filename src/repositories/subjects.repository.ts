import connection from "../database/studynotes.js";
import { Subject, SubjectEntity } from "../protocols/Subject.js";

async function insertSubject({ name, user }: Subject): Promise<number> {
	return (
		await connection.query(
			`INSERT INTO
                subjects
            (name, user_id)
            VALUES ($1, $2);`,
			[name, user]
		)
	).rowCount;
}

async function findSubject({ name, user }: Subject): Promise<SubjectEntity> {
	return (
		await connection.query(
			`SELECT
				id, name
            FROM subjects
            WHERE name = $1
                AND user_id = $2;`,
			[name, user]
		)
	)?.rows[0];
}

async function findSubjectById(id: number): Promise<SubjectEntity> {
	return (
		await connection.query(
			`SELECT
				id, name
            FROM subjects
            WHERE id = $1;`,
			[id]
		)
	)?.rows[0];
}

async function listAllSubjects(user: number): Promise<SubjectEntity[]> {
	return (
		await connection.query(
			`SELECT
				id,
                name,
                created_at AS "createdAt",
                edited_at AS "editedAt"
            FROM subjects
            WHERE user_id = $1
            ORDER BY id;`,
			[user]
		)
	)?.rows;
}

async function edit({ id, name, user }: SubjectEntity): Promise<number> {
	return (
		await connection.query(
			`UPDATE subjects
            SET
                name = $1,
                edited_at = $2
            WHERE id = $3
                AND user_id = $4;`,
			[name, new Date(), id, user]
		)
	).rowCount;
}

export { insertSubject, findSubject, listAllSubjects, edit, findSubjectById };
