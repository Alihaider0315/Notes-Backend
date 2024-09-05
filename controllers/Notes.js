import CreateNotesModule from "../models/Notes.js"

const Create = async (req, res) => {
    try {
        const userId = req.userId;
        const { title} = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: "Title Is Required" });
        }
        // if (!description) {
        //     return res.status(400).json({ success: false, message: "Description Is Required" });
        // }

        const newNotes = new CreateNotesModule({
            title,
            // description,
            userId
        });

        await newNotes.save();
        res.status(200).json({ success: true, message: "Notes Created Successfully", notes: newNotes });
    } catch (error) {
        console.error(error); // Optionally log the error for debugging
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Notes Update Code

const UpdateNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const noteId = req.params.id; 
        const { title } = req.body;

        const findNotes = await CreateNotesModule.findById(noteId); 
        if (!findNotes) {
            return res.status(404).json({ success: false, message: "Notes Not Found" });
        }

        const notesUserId = findNotes.userId;
        if (userId.toString() !== notesUserId) {
            return res.status(401).json({ success: false, message: "You Are Not Authorized To Update This" });
        }

        const updateNotes = await CreateNotesModule.findByIdAndUpdate(
            noteId,
            { title}, 
            { new: true } 
        );

        res.status(200).json({ success: true, message: "Notes Has Been Updated!!", updateNotes });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const DeleteNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const noteId = req.params.id; // Accessing note ID from params

        const findNotes = await CreateNotesModule.findById(noteId); // Find note by ID
        if (!findNotes) {
            return res.status(404).json({ success: false, message: "Notes Not Found" });
        }

        const notesUserId = findNotes.userId;
        if (userId.toString() !== notesUserId) {
            return res.status(401).json({ success: false, message: "You Are Not Authorized To Delete This Note" });
        }

        await CreateNotesModule.findByIdAndDelete(noteId); // Delete note by ID

        res.status(200).json({ success: true, message: "Notes Has Been Deleted Successfully" });

    } catch (error) {
        console.error(error); // Optionally log the error for debugging
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const GetNote = async (req, res) => {
   try {
    const userId = req.userId
    const Notes = await CreateNotesModule.find({userId})
    if(!Notes){
        return res.status(404).json({success:false,message:'No data Found'})
    }
    res.status(200).json({success:true, Notes})
   } catch (error) {
    console.error(error); // Optionally log the error for debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
   }
}

export { Create, UpdateNotes , DeleteNotes , GetNote };
