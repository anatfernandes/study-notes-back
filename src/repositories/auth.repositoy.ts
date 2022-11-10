import connection from "../database/studynotes.js";
import { Session } from "../protocols/Session.js";
import { NewUser, UserEntity } from "../protocols/User.js";

async function insertUser({
	username,
	email,
	password,
}: NewUser): Promise<number> {
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

async function findUser(email: string): Promise<UserEntity> {
	return (
		await connection.query(
			`SELECT
				id, username, password, email
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

async function hasActiveSession(token: string): Promise<Session> {
	return (
		await connection.query(
			`SELECT
				id, user_id
            FROM sessions
            WHERE token = $1
				AND active = TRUE;`,
			[token]
		)
	)?.rows[0];
}

async function deleteSession(token: string): Promise<number> {
	return (
		await connection.query(
			`UPDATE sessions
			SET active = FALSE
            WHERE token = $1
				AND active = TRUE;`,
			[token]
		)
	).rowCount;
}

export {
	insertUser,
	findUser,
	userHasActiveSession,
	insertSession,
	hasActiveSession,
	deleteSession,
};
