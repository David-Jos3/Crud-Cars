import { Router } from 'express'
import CarsControllers from '../controllers/CarsControllers'
import UserControllers from '../controllers/UserControllers'

const router = Router()

router.post('/register', UserControllers.registerNewUser)
router.post('/login', UserControllers.loginUser)

router.get('/cars', CarsControllers.getCars)
router.get('/cars/:id', CarsControllers.getCarsId)
router.post('/cars', CarsControllers.sendCars)
router.put('/cars/:id', CarsControllers.updateCars)
router.delete('/cars/:id', CarsControllers.deleteCars)

export default router
