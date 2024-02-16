/* eslint-disable max-len */
import { NursesRepository } from '../../../infra/repositories/implementations/NursesRepository';
import { FindNursesAndPossibleJobsUseCase } from './FindNursesAndPossibleJobsUseCase';

export const findNursesAndPossibleJobsUseCase = new FindNursesAndPossibleJobsUseCase(
  new NursesRepository(),
);
