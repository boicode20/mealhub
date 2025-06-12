import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import cookie from 'cookie-parser'
import connectDB from './connection/connect.js';
import route from './routes/route.js';
import path from 'path'
//Instance of express
const app = express();
const __dirname = path.resolve()

if(process.env.NODE_ENV !=="production"){

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

}

app.use(express.json());
app.use(cookie());

// server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

// database connection
connectDB();

// Routes
app.use('/api',route)

if(process.env.NODE_ENV==="production"){
    app.use(express.static.join(__dirname,"../frontend/dist"))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}