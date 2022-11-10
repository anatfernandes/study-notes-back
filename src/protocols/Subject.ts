export type SubjectEntity = {
	id: number;
	name: string;
	user?: number;
	createdAt?: string | Date;
	editedAt?: string | Date;
};

export type Subject = Omit<SubjectEntity, "id" | "createdAt" | "editedAt">;
