import dataCars from '../model/CarsModel'
import express from 'express'

async function getCars(request: express.Request, response: express.Response) {
  try {
    const query = await dataCars.allItems()
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function getCarsId(request: express.Request, response: express.Response) {
  try {
    const { id } = request.params
    const query = await dataCars.getItemById(Number(id))
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function sendCars(request: express.Request, response: express.Response) {
  try {
    const { marca, modelo, ano } = request.body
    const query = await dataCars.createItem(marca, modelo, ano)
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function updateCars(
  request: express.Request,
  response: express.Response,
) {
  try {
    const { id } = request.params
    const { marca, modelo, ano } = request.body
    const query = await dataCars.updateItem(Number(id), marca, modelo, ano)
    return response.status(201).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

async function deleteCars(
  request: express.Request,
  response: express.Response,
) {
  try {
    const { id } = request.params
    const query = await dataCars.deleteItem(Number(id))
    response.status(204).json(query)
  } catch {
    response.status(500).send('Internal server Error')
  }
}

export default { getCars, sendCars, getCarsId, updateCars, deleteCars }
