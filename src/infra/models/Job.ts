import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IJob } from '../../domain/entities/IJob';

@Entity('jobs')
export class Job implements IJob {
  @PrimaryColumn({ name: 'job_id' })
    jobId: number;

  @Column({ name: 'facility_id' })
    facilityId: number;

  @Column({ name: 'nurse_type_needed' })
    nurseTypeNeeded: string;

  @Column({ name: 'total_number_nurses_needed' })
    totalNumberNursesNeeded: number;
}
