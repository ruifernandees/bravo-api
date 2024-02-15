/* eslint-disable no-unused-vars */
import { IJobsRepository } from '../../../infra/repositories/IJobsRepository';
import { IRemainingJobsGroupedByFacilityAndNurseTypes } from '../../entities/IRemainingJobsGroupedByFacilityAndNurseTypes';

export class FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase {
  constructor(private repository: IJobsRepository) {}

  async execute(): Promise<IRemainingJobsGroupedByFacilityAndNurseTypes> {
    return this.repository.findRemainingJobsGroupedByFacilityAndNurseType();
  }
}
