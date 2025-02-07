import express from 'express';
import * as budgetController from '../controllers/budget-controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const router = express.Router();

router.route('/createBudget')
    .post(budgetController.createBudget);
    
// router.route('/getBudget')
//     .get(budgetController.listBudgets);

router.get('/:id/getBudget', asyncHandler(budgetController.listBudgets));


// try {
//     router.route('/getUserId')
//         .get(authenticateUser, (req, res) => {
//             res.status(200).json({ userId: req.user.id });
//     });
// } catch (error) {
//     console.log("error in get userID");
// }


// router.post('/', createBudget);
// router.get('/', listBudgets);

export default router;