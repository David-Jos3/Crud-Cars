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
    const user = await dataUsers.createUser(username, email, password)
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
    const user = await dataUsers.checkUser(email, password)
    if (user) {
      const token = jwt.sign({ email }, `${process.env.SECRET}`, {
        expiresIn: 500,
      })
      response.status(200).json({ message: 'Login successful', token })
    } else {
      response.status(401).json({ message: 'Login failed' })
    }
  } catch {
    response.status(500).json({ message: 'Internal Server Error' })
  }
}

export default { loginUser, registerNewUser }
