export type SubjectEntity = {
	id: number;
	name: string;
	user?: number;
	created_at?: string | Date;
	edited_at?: string | Date;
};

export type Subject = Omit<SubjectEntity, "id" | "created_at" | "edited_at">;
