import express from 'express';
import authController from '../controllers/auth-controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = express.Router();

// User registration route
router.route('/register').post(asyncHandler(authController.register));

// User login route
router.route('/login').post(asyncHandler(authController.login));

// Forgot password route
router.route('/forgotPassword').post(asyncHandler(authController.forgotPassword));

// Reset password route
router.route('/resetPassword').put(asyncHandler(authController.resetPassword));

// Delete user route
router.route('/deleteUser/:userId').delete(asyncHandler(authController.deleteUser));

console.log("Authentication routes successfully set up.");

export default router;
