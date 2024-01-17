import { RowDataPacket } from 'mysql2'
import connection from '../database/db'
import bcrypt from 'bcrypt'

const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
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
    console.log(username, email)
    return { username, email }
  }
}

const checkUser = async (email: string, password: string) => {
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

export default { checkUser, createUser }
