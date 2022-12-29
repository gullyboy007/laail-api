import express from 'express';
import controller from '../controllers/Contracts';

const router = express.Router();

router.post('/create', controller.createContract);
router.post('/getone', controller.findContract);
router.get('/get', controller.findAll);
router.patch('/update', controller.updateContract);
router.delete('/delete', controller.deleteContract);

export = router;