import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import {database}  from "./config/db"
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT 

app.use(express.json());

//router routes

database.connect().then(() => {
  console.log('Connected to the database');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});