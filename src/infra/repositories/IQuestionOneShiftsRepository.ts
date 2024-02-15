import { IQuestionOneShift } from '../../domain/entities/IQuestionOneShift';

export interface IQuestionOneShiftsRepository {
  index: () => Promise<IQuestionOneShift[]>;
}
