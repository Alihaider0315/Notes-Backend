import express from  'express'
import dotenv from 'dotenv'
import AuthRoutes from './routes/Auth.js';
import DbCon from './utlis/db.js';
import NotesRoute from './routes/Notes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config()

const PORT = process.env.PORT
const app = express();

// Database Connection

DbCon()
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/auth',AuthRoutes)
app.use('/notes',NotesRoute)
app.get('/api/get',(req,res)=>{
    res.send('hello world')
})

app.listen(PORT,()=>{
    console.log(`Server is running On Port ${PORT}`)
})