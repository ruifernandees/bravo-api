import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/typeorm/datasource';
import { Job } from '../../models/Job';
import { IRemainingJobsGroupedByFacilityAndNurseTypes } from '../../../domain/entities/IRemainingJobsGroupedByFacilityAndNurseTypes';
import { IJobsRepository } from '../IJobsRepository';

export class JobsRepository implements IJobsRepository {
  repository: Repository<Job> = AppDataSource.getRepository(Job);

  async findRemainingJobsGroupedByFacilityAndNurseType():
    Promise<IRemainingJobsGroupedByFacilityAndNurseTypes> {
    const result = await this.repository.query(`
      WITH total_jobs AS (
        SELECT
            fc.facility_id,
            jb.nurse_type_needed,
            sum(jb.total_number_nurses_needed) AS total_number_nurses_needed
        FROM 
            facilities fc
        JOIN jobs jb ON
            jb.facility_id = fc.facility_id
        GROUP BY
            fc.facility_id,
            jb.nurse_type_needed
      ),
      filled_jobs AS (
        SELECT
            jb.facility_id AS "facilityId",
            jb.nurse_type_needed AS "nurseTypeNeeded",
            count(nhj.*) AS "filledPositions"
        FROM
            jobs jb
        JOIN nurse_hired_jobs nhj ON
            nhj.job_id = jb.job_id
        GROUP BY
            jb.facility_id,
            jb.nurse_type_needed
      )
      SELECT
        fj."facilityId",
        fj."nurseTypeNeeded",
        tj.total_number_nurses_needed - fj."filledPositions" AS "remainingPositions"
      FROM
        total_jobs tj
      JOIN filled_jobs fj ON
        fj."facilityId" = tj.facility_id
        AND fj."nurseTypeNeeded" = tj.nurse_type_needed
      ORDER BY tj.facility_id ASC, tj.nurse_type_needed ASC
    `);
    return result.map((item: any) => ({
      ...item,
      remainingPositions: Number(item.remainingPositions),
    }));
  }
}
