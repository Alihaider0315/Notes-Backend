import mongoose from "mongoose";

const NotesSchema = mongoose.Schema({
    title : {
          type:String  
    },

    description : {
        type:String
    },
    
    userId : {
        type: String
    }


},{
    timestamps:true
})

const CreateNotesModule = mongoose.model("Notes",NotesSchema)

export default CreateNotesModule