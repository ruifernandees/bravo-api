import { QuestionOneShiftsRepository } from '../../../infra/repositories/implementations/QuestionOneShiftsRepository';
import { FindQuestionOneShiftByIdUseCase } from './FindQuestionOneShiftByIdUseCase';

export const findQuestionOneShiftByIdUseCase = new FindQuestionOneShiftByIdUseCase(
  new QuestionOneShiftsRepository(),
);
