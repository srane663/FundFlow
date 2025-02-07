import { Router } from "express";
import * as IncomeController from "../controllers/income-controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

// Route to create a new income entry
router
  .route('/')
  .post(asyncHandler(IncomeController.createIncome)); // Create income

// Route to update, get, or delete a specific income entry by ID
router
  .route("/:id/update")
  .put(asyncHandler(IncomeController.updateIncomeEntry)); // Update income
  
router
  .route("/delete")
  .delete(asyncHandler(IncomeController.deleteIncomeEntry)); // Delete income

router.get("/:id/getIncome", asyncHandler(IncomeController.get_Incomes));

export default router;
