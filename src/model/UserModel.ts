import { RowDataPacket } from 'mysql2'
import connection from '../database/db'
import bcrypt from 'bcrypt'

async function createUserModel(
  username: string,
  email: string,
  password: string,
) {
  const [user] = (await connection.execute(
    'SELECT * FROM user WHERE email = ?',
    [email],
  )) as RowDataPacket[]
  if (user.length > 0) {
    return null
  } else {
    const passwordHash = await bcrypt.hash(password, 10)
    await connection.execute(
      'INSERT INTO user (username, email, password ) VALUES (?,?,?)',
      [username, email, passwordHash],
    )
    return { username, email }
  }
}

async function checkUserModel(email: string, password: string) {
  try {
    const [rows] = (await connection.execute(
      'SELECT * FROM user WHERE email = ?',
      [email],
    )) as RowDataPacket[]
    if (rows.length > 0) {
      const user = rows[0]
      const comparePassword = await bcrypt.compare(password, user.password)
      return comparePassword ? user : null
    }
  } catch (error) {
    console.error(error)
  }
}

async function updatePasswordModel(
  userId: number,
  email: string,
  password: string,
) {
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const [result] = (await connection.execute(
      'UPDATE user SET password=? WHERE id=?',
      [passwordHash, userId],
    )) as RowDataPacket[]

    if (result.affectedRows > 0) {
      return { userId, email, password }
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function deleteUserModel(userId: number) {
  try {
    await connection.execute('DELETE FROM user WHERE id=?', [userId])
    return { userId }
  } catch (error) {
    console.error(error)
  }
}

export default {
  checkUserModel,
  createUserModel,
  updatePasswordModel,
  deleteUserModel,
}
