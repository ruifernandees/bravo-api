import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/typeorm/datasource';
import { Job } from '../../models/Job';
import { IRemainingJobsGroupedByFacilityAndNurseTypes } from '../../../domain/entities/IRemainingJobsGroupedByFacilityAndNurseTypes';
import { IJobsRepository } from '../IJobsRepository';
import { IFitForJob } from '../../../domain/entities/IFitForJob';

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

  async findBestFitForEachJob(): Promise<IFitForJob[]> {
    const result = await this.repository.query(`WITH jobs_and_remaining_positions AS (
      SELECT
        jb.job_id,
        jb.facility_id,
        jb.nurse_type_needed,
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
      JOIN jobs jb ON
        jb.job_id = nhj.job_id
        AND jb.nurse_type_needed = ns.nurse_type
      ),
      nurses_and_facilities AS (
      SELECT
           jb2.facility_id,
        ns2.nurse_id
           ,
        count(jb2.facility_id) AS number_of_jobs_same_facility
      FROM
          nurses ns2
      LEFT JOIN nurse_hired_jobs nhj2 ON
          nhj2.nurse_id = ns2.nurse_id
      LEFT JOIN jobs jb2 ON
        jb2.job_id = nhj2.job_id
      GROUP BY
        jb2.facility_id,
        ns2.nurse_id
      ORDER BY
        number_of_jobs_same_facility DESC
      ),
      nurses_total_jobs AS (
      SELECT
        ns3.nurse_id
           ,
        count(*) AS total_jobs
      FROM
          nurses ns3
      LEFT JOIN nurse_hired_jobs nhj3 ON
          nhj3.nurse_id = ns3.nurse_id
      GROUP BY
        ns3.nurse_id
      ORDER BY
        total_jobs DESC
      )
      SELECT
        pnj.nurse_id AS "nurseId",
        jrp.job_id AS "jobId",
        jrp.facility_id AS "facilityId",
        jrp.nurse_type_needed AS "nurseTypeNeeded",
        nf.number_of_jobs_same_facility AS "numberOfJobsSameFacility",
        ntj.total_jobs AS "totalJobs",
        ROW_NUMBER() OVER(
            PARTITION BY jrp.job_id
            ORDER BY nf.number_of_jobs_same_facility DESC, ntj.total_jobs DESC, pnj.nurse_id ASC
        ) AS "nursePriority"
      FROM
        possible_nurses_for_each_job pnj
      JOIN jobs_and_remaining_positions jrp ON
        jrp.job_id = pnj.job_id
        AND jrp."remainingPositions" > 0
      JOIN nurses_and_facilities nf ON
        nf.nurse_id = pnj.nurse_id
      JOIN nurses_total_jobs ntj ON
        ntj.nurse_id = pnj.nurse_id
      ORDER BY
        pnj.job_id DESC
    `);

    return result.map((item: any) => ({
      ...item,
      numberOfJobsSameFacility: Number(item.numberOfJobsSameFacility),
      totalJobs: Number(item.totalJobs),
      nursePriority: Number(item.nursePriority),
    }));
  }
}
