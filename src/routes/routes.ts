import { Router } from 'express'
import CarsControllers from '../controllers/CarsControllers'
import UserControllers from '../controllers/UserControllers'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', UserControllers.registerNewUser)
router.post('/login', UserControllers.loginUser)
router.put('/forgot-password/:userId', UserControllers.forgotPassword)
router.delete('/deleteUser/:userId', UserControllers.deleteUser)

router.get('/cars', authMiddleware, CarsControllers.getCars)
router.get('/cars/:id', authMiddleware, CarsControllers.getCarsId)
router.post('/cars', CarsControllers.sendCars)
router.put('/cars/:id', CarsControllers.updateCars)
router.delete('/cars/:id', CarsControllers.deleteCars)

export default router
