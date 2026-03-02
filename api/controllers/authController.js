import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/database.js'

// REGISTRO
export const register = async (req, res) => {
  try {
    const { email, password, nombre, rol } = req.body

    // Validar datos
    if (!email || !password || !nombre) {
      return res.status(400).json({ error: 'Faltan datos requeridos' })
    }

    const connection = await pool.getConnection()

    // Verificar si el email ya existe
    const [existing] = await connection.query('SELECT id FROM usuarios WHERE email = ?', [email])
    if (existing.length > 0) {
      connection.release()
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    // Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar usuario
    const userRole = rol === 'admin' ? 'admin' : 'usuario'
    await connection.query(
      'INSERT INTO usuarios (email, password, nombre, rol, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
      [email, hashedPassword, nombre, userRole]
    )

    connection.release()

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' })
    }

    const connection = await pool.getConnection()

    // Buscar usuario
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email])
    connection.release()

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    const usuario = rows[0]

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' })
    }

    // Generar JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '7d' }
    )

    res.json({ 
      token, 
      usuario: { 
        id: usuario.id, 
        email: usuario.email, 
        nombre: usuario.nombre, 
        rol: usuario.rol 
      } 
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}
