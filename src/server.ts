import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { database } from "./config/db";
import cors from "cors";
import path from "path"


import { userRoutes } from "./routes/userRoutes";
import { credentialRoutes } from "./routes/credentialRoutes";
import { branchRoutes } from "./routes/branchRoutes";
import { agentRoutes } from "./routes/agentRoutes";
import { addressRoutes } from "./routes/addressRoutes";
import { schoolRoutes } from "./routes/schoolRoutes";
import { businessRoutes } from "./routes/businessRoutes";
import { productRoutes } from "./routes/productRoutes";
import { clientRoutes } from "./routes/clientRoutes";
import { loansRoutes } from "./routes/loansRoutes";
import { assetsRoutes } from "./routes/assetsRoutes";
import { agencyRoutes } from "./routes/agencyRoutes";
// import { areaRoutes } from "./routes/areasRoutes";
//configure env;
dotenv.config();


const app: express.Application = express();
const port = process.env.PORT;

const allowedOrigins = ['http://10.120.50.190:85', 'http://localhost:5173'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      
      const isAllowed = allowedOrigins.some(allowedOrigin => {
        return origin.startsWith(allowedOrigin);
      });
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));


// Connect To The Database
database
  .connect()
  .then(() => {
    console.log("🛢️ Connected To Database");
    // Listen the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("⚠️ Error to connect Database", err);
  });

//Routes
app.use("/api/crmv2", credentialRoutes);
app.use("/api/crmv2", userRoutes);
app.use("/api/crmv2", branchRoutes);
app.use("/api/crmv2", clientRoutes);
app.use("/api/crmv2", agentRoutes);
app.use("/api/crmv2", addressRoutes);
app.use("/api/crmv2", schoolRoutes);
app.use("/api/crmv2", agencyRoutes)
// app.use("/api/crmv2", areaRoutes)
app.use("/api/crmv2", loansRoutes);
app.use("/api/crmv2", businessRoutes);
app.use("/api/crmv2", productRoutes);
app.use("/api/crmv2", assetsRoutes);