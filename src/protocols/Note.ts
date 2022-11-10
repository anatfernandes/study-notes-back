export type NoteEntity = {
	id: number;
	title: string;
	text: string;
	subjectId: number;
	subjectName?: string;
	user?: number;
	createdAt: string | Date;
	editedAt: string | Date;
};

export type NewNote = Omit<
	NoteEntity,
	"id" | "subjectName" | "createdAt" | "editedAt"
>;
