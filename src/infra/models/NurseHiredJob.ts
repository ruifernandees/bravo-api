import { Entity, PrimaryColumn, Column } from 'typeorm';
import { INurseHiredJob } from '../../domain/entities/INurseHiredJob';

@Entity('question_one_shifts')
export class NurseHiredJob implements INurseHiredJob {
  @PrimaryColumn({ name: 'nurse_id' })
    nurseId: number;

  @Column({ name: 'job_id' })
    jobId: number;
}
