import mongoose from "mongoose";

const DbCon=async()=>{
    try{
        mongoose.connect(process.env.MONGODB)
        console.log('Database Is Connected!!')
    }
    catch(error){
        console.log('Database Is Not Connected !!' , error)
    }
}

export default DbCon