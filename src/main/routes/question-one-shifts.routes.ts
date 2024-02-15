import { Router } from 'express';
import { index } from '../controllers/QuestionOneShiftsController';

const QuestionOneShiftsRouter = Router();

QuestionOneShiftsRouter.get('/', index);

export { QuestionOneShiftsRouter };
