import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'Backend funcionando correctamente' })
})

// Iniciar servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(` Servidor ejecutándose en puerto ${PORT}`)
  console.log(`Documentación: http://localhost:${PORT}/api/health`)
})
