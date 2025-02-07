import { addIncome, updateIncome1, deleteIncome1, getIncomes } from './../services/income-service.js';
import { setSuccess, setError } from './response-handler.js';

// Create an income
export const createIncome = async (req, res) => {
    try {
        const income = await addIncome(req.body); // Service to handle addition
        setSuccess(income, res, 201); // HTTP 201 Created
    } catch (error) {
        setError(error, res);
    }
};

// Update an income
export const updateIncomeEntry = async (req, res) => {
    try {
        const { id: userId } = req.params; // Extract userId from params
        const { incomeId } = req.query; // Extract incomeId from query
        console.log("userId:", userId);
        console.log("incomeId:", incomeId);

        const updatedIncome = await updateIncome1(incomeId, req.body); // Pass only incomeId for update
        setSuccess(updatedIncome, res, 200); // HTTP 200 OK
    } catch (error) {
        setError(error, res);
    }
};

// Delete an income
export const deleteIncomeEntry = async (req, res) => {
    try {
        //const { userId, incomeId } = req.params; // Extract userId and incomeId
        const incomeId = req.query.incomeId; // Extract from the query parameter
        await deleteIncome1(incomeId); // Service to handle deletion
        setSuccess(null, res, 204); // HTTP 204 No Content
    } catch (error) {
        setError(error, res);
    }
};

// List all incomes for a user
export const get_Incomes = async (req, res) => {
    try {
        const { id } = req.params; // Extract userId
        const incomes = await getIncomes(id); // Service to retrieve all incomes for the user
        setSuccess(incomes, res, 200); // HTTP 200 OK
    } catch (error) {
        setError(error, res);
    }
};


