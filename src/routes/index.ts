import { Router } from "express";
import authRouter from "./auth.route.js";
import notesRouter from "./notes.route.js";
import subjectsRouter from "./subjects.route.js";

const routes = Router();

routes.use(authRouter);
routes.use(subjectsRouter);
routes.use(notesRouter);

export default routes;