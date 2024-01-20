import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

declare module 'express' {
  interface Request {
    userEmail?: string
  }
}

interface TokenPayload {
  email: string
  iat: number
  exp: number
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers
  if (!authorization) {
    return response.status(401)
  }
  const token = authorization.replace('Bearer', '').trim()
  console.log(token)

  try {
    const data = jwt.verify(token, `${process.env.SECRET}`)
    const { email } = data as TokenPayload

    request.userEmail = email

    return next()
  } catch (error) {
    return next(error)
  }
}

export default authMiddleware
