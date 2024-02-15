import { Request, Response } from 'express';
import { findAllQuestionOneShiftsUseCase } from '../../domain/useCases/FindAllQuestionOneShiftsUseCase';
import { findQuestionOneShiftByIdUseCase } from '../../domain/useCases/FindQuestionOneShiftByIdUseCase';

export async function index(
  request: Request,
  response: Response,
): Promise<Response> {
  return response.json(await findAllQuestionOneShiftsUseCase.execute());
}

export async function compareShifts(
  request: Request,
  response: Response,
): Promise<Response> {
  const firstShift = await findQuestionOneShiftByIdUseCase.execute(request.body.firstShift);
  if (!firstShift) return response.sendStatus(404).json({ message: 'First shift not found' });
  const secondShift = await findQuestionOneShiftByIdUseCase.execute(request.body.secondShift);
  if (!secondShift) return response.sendStatus(404).json({ message: 'Second shift not found' });
  return response.json({ firstShift, secondShift });
}
