import { INurseWithPossibleJobs } from '../../domain/entities/INurseWithPossibleJobs';

export interface INursesRepository {
  findNursesAndPossibleJobs(): Promise<INurseWithPossibleJobs[]>;
}
