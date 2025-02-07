import authRouter from "./auth-router.js";
import expenseRouter from './expense-router.js';
import incomeRouter from './income-router.js';
import budgetRouter from './budget-router.js';
import reportRouter from './report-router.js';
import authenticateUser from './../middlewares/authenticateUser.js';


const initializeRoutes = (app) => {
    console.log('route initialized');
    app.use('/auth', authRouter);
    app.use('/expense', expenseRouter);
    app.use('/income',incomeRouter);
    app.use('/budget', budgetRouter);
    app.use('/report', reportRouter);
}

export default initializeRoutes;