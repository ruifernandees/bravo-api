import { Router } from 'express';
import { QuestionOneShiftsRouter } from './question-one-shifts.routes';

const MainRouter = Router();

MainRouter.use('/question-one-shifts', QuestionOneShiftsRouter);

export { MainRouter };
