import  express  from "express";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js"
import userRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"
import reviewRoute from "./routes/review.js"
import bookingRoute from "./routes/bookings.js"
import mongoose from "mongoose";
dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions={
    credentials:true,
    origin:true
}
mongoose.set("strictQuery", false)

// const connect = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
            
//         });
//         console.log("---Connected to Mongo---")
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }   
// }


const connect = async () => {
    try {
        const mongoUrl = process.env.MONGO_URI;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not set.");
        }

        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("---Connected to Mongo---")
        console.log("---Connected to Mongo---");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};


app.get("/", (req,res)=>{
    res.send("api is working")
})

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/v1/tours", tourRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/review",reviewRoute)
app.use("/api/v1/booking",bookingRoute)

app.listen(port ,()=>{
    connect();
    console.log('---server listening on port', port,"---");
})

