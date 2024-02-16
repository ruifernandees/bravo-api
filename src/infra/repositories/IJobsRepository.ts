import { IFitForJob } from '../../domain/entities/IFitForJob';
import { IRemainingJobsGroupedByFacilityAndNurseTypes } from '../../domain/entities/IRemainingJobsGroupedByFacilityAndNurseTypes';

export interface IJobsRepository {
  findRemainingJobsGroupedByFacilityAndNurseType():
    Promise<IRemainingJobsGroupedByFacilityAndNurseTypes>;
  findBestFitForEachJob(): Promise<IFitForJob[]>;
}
