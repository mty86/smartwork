import express from 'express'
import { verifyToken, verifyAdmin } from '../middleware/auth.js'
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} from '../controllers/userController.js'

const router = express.Router()

// Rutas protegidas (requieren autenticación)
router.get('/', verifyToken, verifyAdmin, getAllUsers)
router.get('/:id', verifyToken, getUserById)
router.put('/:id', verifyToken, updateUser)
router.put('/:id/password', verifyToken, changePassword)
router.delete('/:id', verifyToken, verifyAdmin, deleteUser)

export default router
