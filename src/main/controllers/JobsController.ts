import { Request, Response } from 'express';
import { findRemainingJobsGroupedByFacilityAndNurseTypeUseCase } from '../../domain/useCases/FindRemainingJobsGroupedByFacilityAndNurseTypeUseCase';

export async function findRemainingJobsGroupedByFacilityAndNurseType(
  request: Request,
  response: Response,
): Promise<Response> {
  return response.json(await findRemainingJobsGroupedByFacilityAndNurseTypeUseCase.execute());
}
