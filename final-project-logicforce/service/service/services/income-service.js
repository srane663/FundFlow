import Income from '../models/income.js';

/**
 * Add a new income.
 * @param {Object} incomeData - Data for the new income.
 * @returns {Promise<Object>} - The newly created income document.
 */
export const addIncome = async (incomeData) => {
  const newIncome = new Income(incomeData);
  return newIncome.save();
};

/**
 * Get all income entries for a specific user.
 * @param {string} userId - ID of the user.
 * @returns {Promise<Array>} - List of income documents.
 */
export const getIncomes = async (userId) => {
  return Income.find({ userId });
};

/**
 * Update an existing income.
 * @param {string} incomeId - ID of the income to update.
 * @param {Object} incomeData - Updated data for the income.
 * @returns {Promise<Object>} - The updated income document.
 */
export const updateIncome1 = async (incomeId, incomeData) => {
  console.log("Income upfating")
  return Income.findByIdAndUpdate(incomeId, incomeData, {
    new: true, // Return the updated document.
    runValidators: true, // Ensure data validation is applied.
  });
};

/**
 * Delete an existing income.
 * @param {string} incomeId - ID of the income to delete.
 * @returns {Promise<Object>} - The deleted income document.
 */
export const deleteIncome1 = async (incomeId) => {
  return Income.findByIdAndDelete(incomeId);
};
