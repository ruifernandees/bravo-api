import { Entity, PrimaryColumn, Column } from 'typeorm';
import { INurse } from '../../domain/entities/INurse';

@Entity('nurses')
export class Nurse implements INurse {
  @PrimaryColumn({ name: 'nurse_id' })
    nurseId: number;

  @Column({ name: 'nurse_name' })
    nurseName: string;

  @Column({ name: 'nurse_type' })
    nurseType: string;
}
