import { addBudget, getBudgets } from '../services/budget-service.js';
import { setSuccess, setError } from './response-handler.js';

export const createBudget = async (req, res) => {
    try {
        const budget = await addBudget(req.body);
        setSuccess(budget, res);
    } catch (error) {
        setError(error, res);
    }
};

export const listBudgets = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);
        const budgets = await getBudgets(id);
        setSuccess(budgets, res);
    } catch (error) {
        setError(error, res);
    }
};