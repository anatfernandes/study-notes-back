import connection from "../database/studynotes.js";
import { User } from "../protocols/User.js";

async function insertUser({
	username,
	email,
	password,
}: User): Promise<number> {
	return (
		await connection.query(
			`INSERT INTO
                users
            (username, email, password)
            VALUES ($1, $2, $3);`,
			[username, email, password]
		)
	).rowCount;
}

async function findUser(email: string): Promise<User> {
	return (
		await connection.query(
			`SELECT
				id, username, password
            FROM users
            WHERE email = $1;`,
			[email]
		)
	)?.rows[0];
}

async function userHasActiveSession(userId: number): Promise<boolean> {
	return !!(
		await connection.query(
			`SELECT
				*
            FROM sessions
            WHERE user_id = $1
				AND active = TRUE;`,
			[userId]
		)
	)?.rows.length;
}

async function insertSession(userId: number, token: string): Promise<number> {
	return (
		await connection.query(
			`INSERT INTO
				sessions
            (user_id, token)
			VALUES ($1, $2);`,
			[userId, token]
		)
	).rowCount;
}

export { insertUser, findUser, userHasActiveSession, insertSession };
