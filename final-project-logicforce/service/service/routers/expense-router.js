import express from "express";
import * as ExpenseController from "../controllers/expense-controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

// Route to list all expenses for a specific user and create a new expense
router
  .route('/')
  .post(asyncHandler(ExpenseController.createExpense)); // Create expense

// Route to update, get, or delete a specific expense for a specific user
router
  .route("/:id/update")
  .put(asyncHandler(ExpenseController.updateExpense)); // Update expense
  
router
  .route("/delete")
  .delete(asyncHandler(ExpenseController.deleteExpense));

router.get("/:id/getExpense", asyncHandler(ExpenseController.get_Expenses));

export default router;
