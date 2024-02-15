import { QuestionOneShiftsRepository } from '../../../infra/repositories/implementations/QuestionOneShiftsRepository';
import { FindAllQuestionOneShiftsUseCase } from './FindAllQuestionOneShiftsUseCase';

export const findAllQuestionOneShiftsUseCase = new FindAllQuestionOneShiftsUseCase(
  new QuestionOneShiftsRepository(),
);
