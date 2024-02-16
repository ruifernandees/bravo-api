import { Repository } from 'typeorm';
import { IQuestionOneShift } from '../../../domain/entities/IQuestionOneShift';
import { AppDataSource } from '../../database/typeorm/datasource';
import { QuestionOneShift } from '../../models/QuestionOneShift';
import { IQuestionOneShiftsRepository } from '../IQuestionOneShiftsRepository';

export class QuestionOneShiftsRepository implements IQuestionOneShiftsRepository {
  repository: Repository<QuestionOneShift> = AppDataSource.getRepository(QuestionOneShift);

  async index(): Promise<IQuestionOneShift[]> {
    return this.repository.query(`
      SELECT
        qs.shift_id AS "shiftId",
        qs.facility_id  AS "facilityId",
        qs.shift_date  AS "shiftDate",
        qs.start_time AS "startTime",
        qs.end_time AS "endTime",
        fc.facility_name AS "facilityName"
      FROM
        question_one_shifts qs
      JOIN facilities fc ON
        fc.facility_id = qs.facility_id  
    `);
  }

  async findById(id: IQuestionOneShift['shiftId']): Promise<IQuestionOneShift | null> {
    return this.repository.findOneBy({
      shiftId: id,
    });
  }
}
