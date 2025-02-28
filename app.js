import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"
import connectDB from "./config/db.config.js";

import authRoutes from './routes/user.routes.js'
import aboutRoute from './routes/about.routes.js'
import cors from "cors";

dotenv.config();


const app= express();
app.use(express.json());
// Convert `import.meta.url` to `__dirname` (since ESM doesn't support `__dirname` directly)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

app.use(cors({ 
    origin: ["http://localhost:5175", "http://localhost:5173", "https://anis-gamma.vercel.app"], 
    credentials: true 
  }));
app.use('/api/auth', authRoutes)
app.use('/api/about',aboutRoute)


const port = process.env.PORT || 4000



app.get('/testing_web', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Working",
        description:"Server is working fine"
    });
});
connectDB();


app.listen(port,()=>{
    console.log(`💻 Server is running on port ${port}`)
})