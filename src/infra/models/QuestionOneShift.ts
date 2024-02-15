import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IQuestionOneShift } from '../../domain/entities/IQuestionOneShift';

@Entity('question_one_shifts')
export class QuestionOneShift implements IQuestionOneShift {
  @PrimaryColumn({ name: 'shift_id' })
    shiftId: number;

  @Column({ name: 'facility_id' })
    facilityId: number;

  @Column({ name: 'shift_date' })
    shiftDate: Date;

  @Column({ name: 'start_time' })
    startTime: Date;

  @Column({ name: 'end_time' })
    endTime: Date;
}
