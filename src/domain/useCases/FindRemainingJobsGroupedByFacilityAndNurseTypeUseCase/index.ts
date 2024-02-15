/* eslint-disable max-len */
import { JobsRepository } from '../../../infra/repositories/implementations/JobsRepository';
import { FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase } from './FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase';

export const findRemainingJobsGroupedByFacilityAndNurseTypeUseCase = new FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase(
  new JobsRepository(),
);
