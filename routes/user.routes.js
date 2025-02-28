import express from 'express'
import { getAdminInof, loginAdmin, registerAdmin } from '../controllers/user.controller.js';
 
const router = express.Router();
router.post('/register',registerAdmin)
router.post('/login',loginAdmin)
router.get('/get',getAdminInof)


export default router;
