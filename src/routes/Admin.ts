import express from 'express';
import controller from '../controllers/Admin';

const router = express.Router();

router.post('/create', controller.createAdmin);
router.get('/get', controller.findAll);
router.post('/signin', controller.signin);

export = router;