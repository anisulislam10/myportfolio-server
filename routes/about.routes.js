import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { createAbout, getAbout, updateAbout, deleteAbout } from "../controllers/about.controller.js";

const router = express.Router();

router.post('/post', upload.single('image'), createAbout);
router.get('/get', getAbout);
router.put('/update/:id', upload.single('image'), updateAbout);
router.delete('/delete/:id', deleteAbout);

export default router;
