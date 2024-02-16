/* eslint-disable no-unused-vars */
import { INursesRepository } from '../../../infra/repositories/INursesRepository';
import { INurseWithPossibleJobs } from '../../entities/INurseWithPossibleJobs';

export class FindNursesAndPossibleJobsUseCase {
  constructor(private repository: INursesRepository) {}

  async execute(): Promise<INurseWithPossibleJobs[]> {
    return this.repository.findNursesAndPossibleJobs();
  }
}
