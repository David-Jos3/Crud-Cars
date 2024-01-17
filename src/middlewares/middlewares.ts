import { Request, Response, NextFunction } from 'express'

const authentication = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('Method', request.method)
  console.log('Body', request.body)
  next()
}

export default authentication
