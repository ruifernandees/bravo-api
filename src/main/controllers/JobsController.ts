import { Request, Response } from 'express';
import { findRemainingJobsGroupedByFacilityAndNurseTypeUseCase } from '../../domain/useCases/FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase';
import { findBestFitForEachJobUseCase } from '../../domain/useCases/FindBestFitForEachJobUseCase';

export async function findRemainingJobsGroupedByFacilityAndNurseType(
  request: Request,
  response: Response,
): Promise<Response> {
  return response.json(await findRemainingJobsGroupedByFacilityAndNurseTypeUseCase.execute());
}

export async function findBestFitForEachJob(
  request: Request,
  response: Response,
): Promise<Response> {
  return response.json(await findBestFitForEachJobUseCase.execute());
}
