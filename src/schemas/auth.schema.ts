import joi from "joi";

const signupBody: joi.ObjectSchema<string> = joi.object({
	username: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
});

const signinBody: joi.ObjectSchema<string> = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});

export { signupBody, signinBody };
