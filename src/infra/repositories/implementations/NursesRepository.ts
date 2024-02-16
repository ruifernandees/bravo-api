import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/typeorm/datasource';
import { Nurse } from '../../models/Nurse';
import { INursesRepository } from '../INursesRepository';
import { INurseWithPossibleJobs } from '../../../domain/entities/INurseWithPossibleJobs';

export class NursesRepository implements INursesRepository {
  repository: Repository<Nurse> = AppDataSource.getRepository(Nurse);

  async findNursesAndPossibleJobs(): Promise<INurseWithPossibleJobs[]> {
    const result = await this.repository.query(`
      WITH jobs_and_remaining_positions AS (
        SELECT
          jb.job_id,
          jb.total_number_nurses_needed - jfp.filled_positions AS "remainingPositions"
        FROM
          jobs jb
        JOIN (
          SELECT
            nhj2.job_id,
            count(*) AS filled_positions
          FROM
            nurse_hired_jobs nhj2
          GROUP BY
            nhj2.job_id
          )
        jfp ON
          jfp.job_id = jb.job_id
      ),
      possible_nurses_for_each_job AS (
      SELECT
          ns.*,
          nhj.job_id
      FROM
          nurses ns
      JOIN nurse_hired_jobs nhj ON
          nhj.nurse_id <> ns.nurse_id
      )
      SELECT
        pnj.nurse_id AS "nurseId",
        pnj.nurse_name AS "nurseName",
        pnj.nurse_type AS "nurseType",
        count(*) AS "possibleJobs"
      FROM
        possible_nurses_for_each_job pnj
      JOIN jobs_and_remaining_positions jrp ON
        jrp.job_id = pnj.job_id
        AND jrp."remainingPositions" > 0
      GROUP BY
        pnj.nurse_id,
        pnj.nurse_name,
        pnj.nurse_type
      ORDER BY pnj.nurse_id ASC
    `);
    return result.map((item: any) => ({
      ...item,
      possibleJobs: Number(item.possibleJobs),
    }));
  }
}
