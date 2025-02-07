import Budget from '../models/budget.js';

export const addBudget = async (budgetData) => {
    const newBudget = new Budget(budgetData);
    return newBudget.save();
};

export const getBudgets = async (userId) => {
    console.log("userID", userId);
    return Budget.find({ userId });
};