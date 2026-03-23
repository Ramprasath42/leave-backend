const express =require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const leaveRoutes=require("./routes/leaveRoutes")

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://admin:admin123@ac-rvncg9p-shard-00-00.s9g5vju.mongodb.net:27017,ac-rvncg9p-shard-00-01.s9g5vju.mongodb.net:27017,ac-rvncg9p-shard-00-02.s9g5vju.mongodb.net:27017/?ssl=true&replicaSet=atlas-cgfquz-shard-0&authSource=admin&appName=Cluster0").then(()=>console.log("DB connected")).catch(err=>console.log(err));

app.use("/api/leaves",leaveRoutes);
app.get("/", (req,res)=>{res.send("API running")});
const port =process.env.PORT ||5000;
app.listen(PORT,()=>console.log("Server is running on 5000"));