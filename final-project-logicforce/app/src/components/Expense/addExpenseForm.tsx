import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { addUser } from '../../lib/helper';
import styleExpense from '../../styles/Expense.module.scss';
import Success from './success';

// Define interface for the expense model
interface ExpenseModel {
  name: string;
  userId: string | null;
  category: string;
  description: string;
  expense: string;
  date: string;
}

// Define props for Success component (if needed)
interface SuccessProps {
  message: string;
}

export default function AddUserForm(): React.ReactElement {
  const queryClient = useQueryClient();
  
  // Type the mutation with the ExpenseModel
  const addMutation = useMutation<void, Error, ExpenseModel>(addUser, {
    onSuccess: () => {
      console.log("Data Inserted");
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Type-safe form element access
    const form = e.currentTarget;
    
    if (form.elements.length === 0) {
      console.log("Don't have form data");
      return;
    }
    
    // Type assertion for form elements
    const elements = form.elements as unknown as HTMLInputElement[];
    
    const userId = localStorage.getItem("loggedInUserId");
    
    const model: ExpenseModel = {
      name: elements[0].value,
      userId,
      category: elements[1].value,
      description: elements[2].value,
      expense: elements[3].value,
      date: elements[4].value,
    };
    
    addMutation.mutate(model);
  };

  // Loading state
  if (addMutation.isLoading) return <div>Loading!</div>;

  // Success state
  if (addMutation.isSuccess) return <Success messsage={"Added Successfully"} />;

  return (
    <div>
      <form className={styleExpense.expenseForm} onSubmit={handleSubmit}>
        <div className={styleExpense.expenseInfo}>
          <label className={styleExpense.formlabel}>EXPENSE NAME</label>
          <input 
            className={styleExpense.forminput} 
            type="text" 
            name="name"  
          />
        </div>
        
        <div className={styleExpense.expenseInfo}>
          <label className={styleExpense.formlabel}>EXPENSE CATEGORY</label>
          <input 
            className={styleExpense.forminput} 
            type="text" 
            name="category" 
          />
        </div>

        <div className={styleExpense.expenseInfo}>
          <label className={styleExpense.formlabel}>EXPENSE DESCRIPTION</label>
          <input 
            className={styleExpense.forminput} 
            type="text" 
            name="description" 
          />
        </div>

        <div className={styleExpense.expenseInfo}>
          <label className={styleExpense.formlabel}>EXPENSE AMOUNT</label>
          <input 
            className={styleExpense.forminput} 
            type="text" 
            name="expense" 
          />
        </div>

        <div className={styleExpense.expenseInfo}>
          <label className={styleExpense.formlabel}>EXPENSE DATE</label>
          <input 
            className={styleExpense.forminput} 
            type="date" 
            name="date" 
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check"></div>
          <div className="form-check"></div>
        </div>
        
        <button className={styleExpense.buttonAdd}>ADD</button>
      </form>
    </div>
  );
}