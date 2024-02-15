/* eslint-disable no-unused-vars */
import { IQuestionOneShiftsRepository } from '../../../infra/repositories/IQuestionOneShiftsRepository';
import { IQuestionOneShift } from '../../entities/IQuestionOneShift';

export class FindAllQuestionOneShiftsUseCase {
  constructor(private repository: IQuestionOneShiftsRepository) {}

  async execute(): Promise<IQuestionOneShift[]> {
    return this.repository.index();
  }
}
