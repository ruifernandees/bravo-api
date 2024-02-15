/* eslint-disable no-unused-vars */
import { IQuestionOneShift } from '../../domain/entities/IQuestionOneShift';

export interface IQuestionOneShiftsRepository {
  index(): Promise<IQuestionOneShift[]>;
  findById(id: IQuestionOneShift['shiftId']): Promise<IQuestionOneShift | null>;
}
