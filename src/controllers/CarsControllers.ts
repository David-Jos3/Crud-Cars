import dataCars from '../model/CarsModel'
import { Request, Response } from 'express'

async function getCars(request: Request, response: Response) {
  try {
    const search = request.query.search as string | undefined
    const query = await dataCars.getItems(search)
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function getCarsId(request: Request, response: Response) {
  try {
    const { id } = request.params
    const query = await dataCars.getItemById(id)
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function sendCars(request: Request, response: Response) {
  try {
    const { marca, modelo, ano } = request.body
    await dataCars.createItem(marca, modelo, ano)
    return response.status(201).send()
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function updateCars(request: Request, response: Response) {
  try {
    const { id } = request.params
    const { marca, modelo, ano } = request.body
    await dataCars.updateItem(Number(id), marca, modelo, ano)
    return response.status(204).send()
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function deleteCars(request: Request, response: Response) {
  try {
    const { id } = request.params
    await dataCars.deleteItem(Number(id))
    response.status(204).send()
  } catch {
    response.status(500).send('Internal server Error')
  }
}

export default { getCars, sendCars, getCarsId, updateCars, deleteCars }
