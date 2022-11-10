import { Router } from "express";
import authRouter from "./auth.route.js";
import subjectsRouter from "./subjects.route.js";

const routes = Router();

routes.use(authRouter);
routes.use(subjectsRouter);

export default routes;