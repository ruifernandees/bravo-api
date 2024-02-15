import { Router } from 'express';
import { z } from 'zod';
import { compareShifts, index } from '../controllers/QuestionOneShiftsController';
import { validateSchema } from '../../infra/middlewares/validateSchema';

const QuestionOneShiftsRouter = Router();

QuestionOneShiftsRouter.post('/compare', validateSchema(z.object({
  body: z.object({
    firstShift: z.number().int().positive(),
    secondShift: z.number().int().positive(),
  }),
})), compareShifts);

QuestionOneShiftsRouter.get('/', index);

export { QuestionOneShiftsRouter };
