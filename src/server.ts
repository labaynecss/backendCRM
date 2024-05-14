import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import { database } from "./config/db"
import cors from "cors"
import { credentialRoutes} from './routes/credentialRoutes'
//configure env;
dotenv.config();

const app: express.Application = express();
const port = process.env.PORT 
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  }
))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



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
