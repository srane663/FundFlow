import { addExpense, updateExpense1, deleteExpense1, getExpenses } from './../services/expense-service.js';
import { setSuccess, setError } from './response-handler.js';

// Create an expense
export const createExpense = async (req, res) => {
    try {
        const expense = await addExpense(req.body); // Service to handle addition
        setSuccess(expense, res, 201); // HTTP 201 Created
    } catch (error) {
        setError(error, res);
    }
};

// Update an expense
export const updateExpense = async (req, res) => {
    try {
        const { id: userId } = req.params; // Extract userId from params
        const { expenseId } = req.query; // Extract expenseId from query
        console.log("userId:", userId);
        console.log("expenseId:", expenseId);

        const updatedExpense = await updateExpense1(expenseId, req.body); // Pass only expenseId for update
        setSuccess(updatedExpense, res, 200); // HTTP 200 OK
    } catch (error) {
        setError(error, res);
    }
};


// Delete an expense
export const deleteExpense = async (req, res) => {
    try {
       // const { expenseId } = req.params; // Extract userId and expenseId
        const expenseId = req.query.expenseId; // Extract from the query parameter
        await deleteExpense1(expenseId); // Service to handle deletion
        setSuccess(null, res, 204); // HTTP 204 No Content
    } catch (error) {
        setError(error, res);
    }
};

// List all expenses for a user
export const get_Expenses = async (req, res) => {
    try {
        const { id } = req.params; // Extract userId
        console.log("userId", id);
        const expenses = await getExpenses(id); // Service to retrieve all expenses for the user
        setSuccess(expenses, res, 200); // HTTP 200 OK
    } catch (error) {
        setError(error, res);
    }   
};

