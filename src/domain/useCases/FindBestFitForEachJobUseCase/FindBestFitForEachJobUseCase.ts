/* eslint-disable no-unused-vars */

import { IJobsRepository } from '../../../infra/repositories/IJobsRepository';
import { IFitForJob } from '../../entities/IFitForJob';

export class FindBestFitForEachJobUseCase {
  constructor(private repository: IJobsRepository) {}

  async execute(): Promise<IFitForJob[]> {
    return this.repository.findBestFitForEachJob();
  }
}
