import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import '../../infra/database/typeorm/datasource';
import { MainRouter } from '../routes/index.routes';

const app = express();
const port = process.env.PORT || 3000;
app.use(json());

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use(MainRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
