import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import { database } from "./config/db"
import cors from "cors"
import session from "express-session";

import { userRoutes } from './routes/userRoutes';
import { credentialRoutes } from './routes/credentialRoutes';
import { branchRoutes } from './routes/branchRoutes';
import { borrowersRoutes } from './routes/borrowerRoutes';
import { clientRoutes } from './routes/clientRoutes';
import { agentRoutes } from './routes/agentRoutes';
import { addressRoutes } from './routes/addressRoutes';
import { schoolRoutes } from './routes/schoolRoutes';
import { agencyRoutes } from './routes/agencyRoutes';
import { loansRoutes } from './routes/loansRoutes';
//configure env;
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT 
app.use(cors(
  {
    origin: process.env.URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  }
))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: true, 
  cookie: { secure: false }
}));



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
app.use("/api/crmv2", credentialRoutes)
app.use("/api/crmv2", userRoutes)
app.use("/api/crmv2", borrowersRoutes)
app.use("/api/crmv2", branchRoutes)
app.use("/api/crmv2", clientRoutes)
app.use("/api/crmv2", agentRoutes)
app.use("/api/crmv2", addressRoutes)
app.use("/api/crmv2", schoolRoutes)
app.use("/api/crmv2", agencyRoutes)
app.use("/api/crmv2", loansRoutes)







