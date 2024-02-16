/* eslint-disable max-len */
import { JobsRepository } from '../../../infra/repositories/implementations/JobsRepository';
import { FindBestFitForEachJobUseCase } from './FindBestFitForEachJobUseCase';

export const findBestFitForEachJobUseCase = new FindBestFitForEachJobUseCase(
  new JobsRepository(),
);
