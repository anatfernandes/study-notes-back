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

export { insertSubject, findSubject };
