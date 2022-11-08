import connection from "../database/studynotes.js";
import { User } from "../protocols/User.js";

async function insertUser({ username, picture, password }: User): Promise<any> {
	return (
		await connection.query(
			`INSERT INTO
                users
            (username, picture, password)
            VALUES ($1, $2, $3);`,
			[username, picture, password]
		)
	).rowCount;
}

export { insertUser };
