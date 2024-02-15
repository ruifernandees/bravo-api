import { Repository } from 'typeorm';
import { IQuestionOneShift } from '../../../domain/entities/IQuestionOneShift';
import { AppDataSource } from '../../database/typeorm/datasource';
import { QuestionOneShift } from '../../models/QuestionOneShift';
import { IQuestionOneShiftsRepository } from '../IQuestionOneShiftsRepository';

export class QuestionOneShiftsRepository implements IQuestionOneShiftsRepository {
  repository: Repository<QuestionOneShift> = AppDataSource.getRepository(QuestionOneShift);

  async index(): Promise<IQuestionOneShift[]> {
    return this.repository.find();
  }

  async findById(id: IQuestionOneShift['shiftId']): Promise<IQuestionOneShift | null> {
    return this.repository.findOneBy({
      shiftId: id,
    });
  }
}
