import { Router } from 'express'
import CarsControllers from '../controllers/CarsControllers'

const router = Router()

router.get('/cars', CarsControllers.getCars)
router.get('/cars/:id', CarsControllers.getCarsId)
router.post('/cars', CarsControllers.sendCars)
router.put('/cars/:id', CarsControllers.updateCars)
router.delete('/cars/:id', CarsControllers.deleteCars)

export default router
