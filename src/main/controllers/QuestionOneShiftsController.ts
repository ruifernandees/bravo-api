import { Request, Response } from 'express';
import { findAllQuestionOneShiftsUseCase } from '../../domain/useCases/FindAllQuestionOneShiftsUseCase';

export async function index(request: Request, response: Response): Promise<Response> {
  return response.json(await findAllQuestionOneShiftsUseCase.execute());
}
