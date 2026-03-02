import bcrypt from 'bcryptjs'
import pool from '../config/database.js'

// OBTENER TODOS LOS USUARIOS
export const getAllUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query(
      'SELECT id, email, nombre, rol, fecha_registro FROM usuarios ORDER BY fecha_registro DESC'
    )
    connection.release()

    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// OBTENER UN USUARIO POR ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const connection = await pool.getConnection()
    const [rows] = await connection.query(
      'SELECT id, email, nombre, rol, fecha_registro FROM usuarios WHERE id = ?',
      [id]
    )
    connection.release()

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

// ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { email, nombre, rol } = req.body

    if (!email || !nombre || !rol) {
      return res.status(400).json({ error: 'Faltan datos requeridos' })
    }

    const connection = await pool.getConnection()

    // Verificar si el nuevo email ya existe en otro usuario
    const [existing] = await connection.query(
      'SELECT id FROM usuarios WHERE email = ? AND id != ?',
      [email, id]
    )
    if (existing.length > 0) {
      connection.release()
      return res.status(400).json({ error: 'El email ya está en uso' })
    }

    // Actualizar
    const [result] = await connection.query(
      'UPDATE usuarios SET email = ?, nombre = ?, rol = ? WHERE id = ?',
      [email, nombre, rol, id]
    )
    connection.release()

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

// CAMBIAR CONTRASEÑA
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { passwordActual, passwordNueva } = req.body

    if (!passwordActual || !passwordNueva) {
      return res.status(400).json({ error: 'Contraseñas requeridas' })
    }

    const connection = await pool.getConnection()

    // Obtener usuario actual
    const [rows] = await connection.query('SELECT password FROM usuarios WHERE id = ?', [id])

    if (rows.length === 0) {
      connection.release()
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    // Verificar contraseña actual
    const passwordMatch = await bcrypt.compare(passwordActual, rows[0].password)
    if (!passwordMatch) {
      connection.release()
      return res.status(401).json({ error: 'Contraseña actual incorrecta' })
    }

    // Hash nueva contraseña
    const hashedPassword = await bcrypt.hash(passwordNueva, 10)

    // Actualizar
    await connection.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, id])
    connection.release()

    res.json({ mensaje: 'Contraseña actualizada exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al cambiar contraseña' })
  }
}

// ELIMINAR USUARIO
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const connection = await pool.getConnection()

    // Prevenir eliminar el último admin
    const [admins] = await connection.query('SELECT COUNT(*) as count FROM usuarios WHERE rol = "admin"')
    const [user] = await connection.query('SELECT rol FROM usuarios WHERE id = ?', [id])

    if (user.length === 0) {
      connection.release()
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    if (user[0].rol === 'admin' && admins[0].count <= 1) {
      connection.release()
      return res.status(400).json({ error: 'No puedes eliminar el último administrador' })
    }

    // Eliminar
    const [result] = await connection.query('DELETE FROM usuarios WHERE id = ?', [id])
    connection.release()

    res.json({ mensaje: 'Usuario eliminado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}
