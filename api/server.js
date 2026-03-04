import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

// ===== CONFIGURACIÓN CORS =====
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://smartworkrl.onrender.com' // TU FRONTEND EN PRODUCCIÓN
  ],
  credentials: true
}))

// ===== MIDDLEWARES =====
app.use(express.json())

// ===== RUTAS =====
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'Backend funcionando ' })
})

// ===== MANEJO GLOBAL DE ERRORES =====
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Error interno del servidor' })
})

// ===== PUERTO PARA RENDER =====
const PORT = process.env.PORT || 10000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀YA QUEDOOOOOOOOOO ${PORT}`)
})