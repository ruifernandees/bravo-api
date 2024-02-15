import { IRemainingJobsGroupedByFacilityAndNurseTypes } from '../../domain/entities/IRemainingJobsGroupedByFacilityAndNurseTypes';

export interface IJobsRepository {
  findRemainingJobsGroupedByFacilityAndNurseType():
    Promise<IRemainingJobsGroupedByFacilityAndNurseTypes>;
}
