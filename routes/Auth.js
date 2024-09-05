import express from 'express'
import { Login, Logout, Register } from '../controllers/Auth.js'

const AuthRoutes = express.Router()
AuthRoutes.post('/register',Register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout', Logout)

export default AuthRoutes