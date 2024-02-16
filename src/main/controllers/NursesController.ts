import { Request, Response } from 'express';
import { findNursesAndPossibleJobsUseCase } from '../../domain/useCases/FindNursesAndPossibleJobsUseCase';

export async function findNursesAndPossibleJobs(
  request: Request,
  response: Response,
): Promise<Response> {
  return response.json(await findNursesAndPossibleJobsUseCase.execute());
}
