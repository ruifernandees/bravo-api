import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IFacility } from '../../domain/entities/IFacility';

@Entity('facilities')
export class Facility implements IFacility {
  @PrimaryColumn({ name: 'facility_id' })
    facilityId: number;

  @Column({ name: 'facility_name' })
    facilityName: string;
}
