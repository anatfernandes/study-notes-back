export type UserEntity = {
	id: number;
	username: string;
	password: string;
	email: string;
};

export type NewUser = Omit<UserEntity, "id">;

export type User = Omit<UserEntity, "id" | "username">;
