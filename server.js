import dotenv from "dotenv"
dotenv.config();
import express from "express";
import mongoose from "mongoose"
import cors from "cors";

import leaveRoutes from "./routes/leaveRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch(err=>console.log(err));

app.use("/api/leaves",leaveRoutes);
app.get("/", (req,res)=>{res.send("API running")});
const PORT =process.env.PORT ||5000;
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));