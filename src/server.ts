import express, { Request, Response } from 'express';
import {t} from './config/db'
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

//router routes

t().then(() => {
  console.log('Process completed.');
  app.listen(PORT, () => {
    console.log(`Connect on Port ${PORT}`);
  });
}).catch((error) => {
  console.error('An error occurred:', error);
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});
  

