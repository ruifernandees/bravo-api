import { Router } from 'express';
import { QuestionOneShiftsRouter } from './question-one-shifts.routes';
import { JobsRouter } from './jobs.routes';

const MainRouter = Router();

MainRouter.use('/question-one-shifts', QuestionOneShiftsRouter);
MainRouter.use('/jobs', JobsRouter);

export { MainRouter };
