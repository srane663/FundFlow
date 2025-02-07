import express from 'express';
import * as reportController from '../controllers/report-controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = express.Router();


router.get('/:id/monthly', asyncHandler(reportController.generateMonthlyReport));

// Route for yearly report
router.get('/:id/yearly', asyncHandler(reportController.generateYearlyReport));

// Route for monthly reports
// router.get('/monthly', generateMonthlyReport);

// Route for yearly reports
// router.get('/yearly', generateYearlyReport);

export default router;
