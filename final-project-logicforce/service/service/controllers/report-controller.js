import { getMonthlyReport, getYearlyReport } from './../services/report-service.js';
import { setSuccess, setError } from './response-handler.js';

// Generate Monthly Report
export const generateMonthlyReport = async (req, res) => {
    try {
        console.log("req.params:", req.params);
        const { id } = req.params; // Extract `id` from the route
        const { month, year } = req.query; // Extract `month` and `year` from query parameters

        console.log("Extracted id:", id);
        console.log("Extracted month:", month);
        console.log("Extracted year:", year);

        if (!id || !month || !year) {
            return res.status(400).json({
                error: "Missing required parameters: id, month, or year",
            });
        }

        const report = await getMonthlyReport(id, parseInt(month), parseInt(year));
        setSuccess(report, res);
    } catch (error) {
        console.error("Error in generateMonthlyReport:", error.message);
        setError(error, res);
    }
};


// Generate Yearly Report
// Generate Yearly Report
export const generateYearlyReport = async (req, res) => {
    try {
        console.log("req.params:", req.params);
        const { id } = req.params; // Extract `id` from the route
        const { year } = req.query; // Extract `year` from query parameters

        console.log("Extracted id:", id);
        console.log("Extracted year:", year);

        if (!id || !year) {
            return res.status(400).json({
                error: "Missing required parameters: id or year",
            });
        }

        const report = await getYearlyReport(id, parseInt(year));
        setSuccess(report, res);
    } catch (error) {
        console.error("Error in generateYearlyReport:", error.message);
        setError(error, res);
    }
};

