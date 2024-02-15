import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/typeorm/datasource';
import { Job } from '../../models/Job';

export class JobsRepository {
  repository: Repository<Job> = AppDataSource.getRepository(Job);

  async findRemainingJobsGroupedByFacilityAndNurseType(): Promise<any> {
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
            jb.facility_id,
            jb.nurse_type_needed,
            count(nhj.*) AS filled_positions
        FROM
            jobs jb
        JOIN nurse_hired_jobs nhj ON
            nhj.job_id = jb.job_id
        GROUP BY
            jb.facility_id,
            jb.nurse_type_needed
      )
      SELECT
        tj.facility_id,
        tj.nurse_type_needed,
        tj.total_number_nurses_needed - fj.filled_positions AS remaining_positions
      FROM
        total_jobs tj
      JOIN filled_jobs fj ON
        fj.facility_id = tj.facility_id
        AND fj.nurse_type_needed = tj.nurse_type_needed
      ORDER BY tj.facility_id ASC, tj.nurse_type_needed ASC;
    `);
    return result;
  }
}
