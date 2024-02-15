import { Router } from 'express';

const MainRouter = Router();

MainRouter.get('/test', (req, res) => res.json({ message: 'hello world' }));

export { MainRouter };
