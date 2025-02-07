import Expense from './../models/expense.js';

/**
 * Add a new expense.
 * @param {Object} expenseData - Data for the new expense.
 * @returns {Promise<Object>} - The newly created expense document.
 */
export const addExpense = async (expenseData) => {
  const newExpense = new Expense(expenseData);
  return newExpense.save();
};

/**
 * Get all expenses for a specific user.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Array>} - List of expense documents.
 */
export const getExpenses = async (userId) => {
  return Expense.find({ userId });
};

/**
 * Update an existing expense.
 * @param {string} expenseId - ID of the expense to update.
 * @param {Object} expenseData - Updated data for the expense.
 * @returns {Promise<Object>} - The updated expense document.
 */
export const updateExpense1 = async (expenseId, expenseData) => {
  return Expense.findByIdAndUpdate(expenseId, expenseData, {
    new: true, // Return the updated document.
    runValidators: true, // Ensure data validation is applied.
  });
};

/**
 * Delete an existing expense.
 * @param {string} expenseId - ID of the expense to delete.
 * @returns {Promise<Object>} - The deleted expense document.
 */
export const deleteExpense1 = async (expenseId) => {
  return Expense.findByIdAndDelete(expenseId);
};
