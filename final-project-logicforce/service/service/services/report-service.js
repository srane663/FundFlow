import Expense from './../models/expense.js';
import mongoose from 'mongoose';
import { getExpenses } from './expense-service.js';

export const getMonthlyReport = async (userId, month, year) => {
    try {
        console.log("userID:", userId);
        console.log("month:", month);
        console.log("year:", year);

        if (!userId || !month || !year) {
            throw new Error("Missing required parameters: userId, month, or year");
        }

        if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
            throw new Error("Invalid month or year");
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1)); // Start of the month (UTC)
        const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // End of the month (UTC)

        console.log("Start Date (ISO):", startDate.toISOString());
        console.log("End Date (ISO):", endDate.toISOString());

        const userIdObject = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId
        const query = {
            userId: userIdObject,
            date: { $gte: startDate, $lte: endDate },
        };
        console.log("Query Conditions:", query);

        const rawExpenses = await Expense.find(query);
        console.log("Raw Expenses:", rawExpenses);

        const expenses = await Expense.aggregate([
            { $match: query },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);

        console.log("Aggregated Expenses:", expenses);

        if (!expenses.length) {
            console.log("No matching expenses found.");
            return {
                startDate,
                endDate,
                expensesByCategory: [],
                totalSpent: 0,
            };
        }

        const totalSpent = expenses.reduce((sum, expense) => sum + expense.totalAmount, 0);

        return {
            startDate,
            endDate,
            expensesByCategory: expenses,
            totalSpent,
        };
    } catch (error) {
        console.error("Error in getMonthlyReport:", error.message);
        throw error;
    }
};





export const getYearlyReport = async (userId, year) => {
    try {
        console.log("userId:", userId);
        console.log("year:", year);

        if (!userId || !year) {
            throw new Error("Missing required parameters: userId or year");
        }

        if (isNaN(year)) {
            throw new Error("Invalid year");
        }

        const startDate = new Date(Date.UTC(year, 0, 1)); // Start of the year (UTC)
        const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)); // End of the year (UTC)

        console.log("Start Date (ISO):", startDate.toISOString());
        console.log("End Date (ISO):", endDate.toISOString());

        const userIdObject = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
        const query = {
            userId: userIdObject,
            date: { $gte: startDate, $lte: endDate },
        };
        console.log("Query Conditions:", query);

        // Aggregate expenses for the given year
        const expenses = await Expense.aggregate([
            { $match: query },
            {
                $group: {
                    _id: { month: { $month: "$date" } },
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);

        console.log("Aggregated Expenses:", expenses);

        const monthlyBreakdown = expenses.map((e) => ({
            month: e._id.month,
            totalAmount: e.totalAmount,
        }));

        const totalSpent = monthlyBreakdown.reduce((sum, entry) => sum + entry.totalAmount, 0);

        return {
            year,
            monthlyBreakdown,
            totalSpent,
        };
    } catch (error) {
        console.error("Error in getYearlyReport:", error.message);
        throw error;
    }
};

