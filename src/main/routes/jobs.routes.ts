import { Router } from 'express';
import { findRemainingJobsGroupedByFacilityAndNurseType } from '../controllers/JobsController';

const JobsRouter = Router();

JobsRouter.get('/remaining', findRemainingJobsGroupedByFacilityAndNurseType);

export { JobsRouter };
