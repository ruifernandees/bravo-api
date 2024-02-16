import { Router } from 'express';
import { findNursesAndPossibleJobs } from '../controllers/NursesController';

const NursesRouter = Router();

NursesRouter.get('/possibleJobs', findNursesAndPossibleJobs);

export { NursesRouter };
