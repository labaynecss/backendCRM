import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import { database } from "./config/db"
import cors from "cors"
import { credentialRoutes} from './routes/credentialRoutes'

//configure env;
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT 
app.use(cors())
app.use(express.json());


// Connect To The Database
database.connect().then(() => {
  console.log("🛢️ Connected To Database");
  // Listen the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.log("⚠️ Error to connect Database",err);
});




//Routes
app.use("/api/crmv2",credentialRoutes)