import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dataUsers from '../model/UserModel'
import 'dotenv/config'

async function registerNewUser(request: Request, response: Response) {
  try {
    const { username, email, password } = request.body
    if (!username || !email || !password) {
      return response
        .status(400)
        .json({ message: 'E-mail and password and username is required' })
    }
    const user = await dataUsers.createUserModel(username, email, password)
    user
      ? response.status(201).send()
      : response
          .status(409)
          .json({ message: 'This data has already been registered' })
  } catch {
    response.status(500).send('Internal Server Error')
  }
}

async function loginUser(request: Request, response: Response) {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'E-mail and password is required' })
    }
    const user = await dataUsers.checkUserModel(email, password)
    if (user) {
      const token = jwt.sign({ email }, `${process.env.SECRET}`, {
        expiresIn: 100,
      })
      response.status(201).json({ message: 'Login successful', token })
    } else {
      response.status(401).json({ message: 'Login failed' })
    }
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

async function forgotPassword(request: Request, response: Response) {
  try {
    const { userId } = request.params
    const { email, password } = request.body
    const user = await dataUsers.updatePasswordModel(
      Number(userId),
      email,
      password,
    )
    user
      ? response.status(201).json({ message: 'Password updated successfully!' })
      : response.status(500).json({ message: 'Error updating password' })
  } catch (error) {
    console.error(error)
  }
}

async function deleteUser(request: Request, response: Response) {
  try {
    const { userId } = request.params
    await dataUsers.deleteUserModel(Number(userId))
    response.status(201).json({ message: 'user successfully deleted' })
  } catch {
    response.status(500).send('Internal server Error')
  }
}

export default { loginUser, registerNewUser, forgotPassword, deleteUser }
