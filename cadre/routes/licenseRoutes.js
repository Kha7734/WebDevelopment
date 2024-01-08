import express from 'express';
import licenseController from '../controllers/licenseController.js';
import { upload } from '../utils/imgHandler.js';

const router = express.Router();

router.route('/:id')
    .get(licenseController.renderLicenseForm)
    .post(upload.single('imgBoard'),licenseController.createLicense);


export default router;