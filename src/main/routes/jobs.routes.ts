import { Router } from 'express';
import { findBestFitForEachJob, findRemainingJobsGroupedByFacilityAndNurseType } from '../controllers/JobsController';

const JobsRouter = Router();

JobsRouter.get('/remaining', findRemainingJobsGroupedByFacilityAndNurseType);

JobsRouter.get('/findBestFit', findBestFitForEachJob);

export { JobsRouter };
