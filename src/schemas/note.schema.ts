import joi from "joi";

const noteBody: joi.ObjectSchema<string | number> = joi.object({
	title: joi.string().max(255).required(),
	text: joi.string().required(),
	subjectId: joi.number().integer().min(1).required(),
});

export { noteBody };
