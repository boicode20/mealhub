import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import cookie from 'cookie-parser'
import connectDB from './connection/connect.js';
import route from './routes/route.js';

//Instance of express
const app = express();

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));
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