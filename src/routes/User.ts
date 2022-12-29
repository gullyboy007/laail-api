import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/create', controller.createUser);
router.post('/getone', controller.findUser);
//router.post('/nlenders', controller.findContract);
router.post('/nloans', controller.nloans);
router.get('/get', controller.findAll);
router.patch('/update', controller.updateUser);
router.delete('/delete', controller.deleteUser);

export = router;