import {Router} from 'express';
import {addWhiteIp, getAllIp,getFilteredIp} from '../controllers/ip.controller.js'
import {handleValidationErrors, validateIP} from '../middleware/validator.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/get-all-nodes/', getAllIp)
router.post('/add-ip',authMiddleware(["admin"]) ,validateIP, handleValidationErrors, addWhiteIp)
router.get('/get-filtered-ip',getFilteredIp)

export default router;