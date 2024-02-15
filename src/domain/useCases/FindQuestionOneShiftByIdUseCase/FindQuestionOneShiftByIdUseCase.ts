/* eslint-disable no-unused-vars */
import { IQuestionOneShiftsRepository } from '../../../infra/repositories/IQuestionOneShiftsRepository';
import { IQuestionOneShift } from '../../entities/IQuestionOneShift';

export class FindQuestionOneShiftByIdUseCase {
  constructor(private repository: IQuestionOneShiftsRepository) {}

  async execute(id: IQuestionOneShift['shiftId']): Promise<IQuestionOneShift | null> {
    return this.repository.findById(id);
  }
}
