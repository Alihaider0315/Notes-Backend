import express from 'express'
import {Create, DeleteNotes, GetNote, UpdateNotes} from '../controllers/Notes.js'
import { VerificationToken } from '../Middlewares/Verification.js'

const NotesRoute = express.Router()

NotesRoute.post('/createnote',VerificationToken,Create)
NotesRoute.put('/updatenotes/:id',VerificationToken,UpdateNotes)
NotesRoute.delete('/deletenotes/:id',VerificationToken,DeleteNotes)
NotesRoute.get('/getnotes',VerificationToken, GetNote)




export default NotesRoute