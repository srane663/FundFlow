```mermaid
---
title: Expense Tracking Domain Model
---

classDiagram
    %% Bounded Contexts
    class UserContext {
        - userId: String
        - username: String
        - email: String
        - password: String
        + registerUser(data): Boolean
        + authenticateUser(credentials): Token
        + updateProfile(data): Boolean
    }
    
    class ExpenseContext {
        - expenseId: String
        - userId: String
        - category: String
        - amount: Float
        - date: Date
        + addExpense(expense): Boolean
        + updateExpense(expenseId, updates): Boolean
        + deleteExpense(expenseId): Boolean
        + fetchExpensesByCategory(userId, category): List
    }

    class BudgetContext {
        - budgetId: String
        - userId: String
        - category: String
        - limit: Float
        - startDate: Date
        - endDate: Date
        + createBudget(data): Boolean
        + updateBudget(budgetId, updates): Boolean
        + deleteBudget(budgetId): Boolean
        + getBudgetAlerts(userId): List
    }

    class VisualizationContext {
        + generateBarChart(expenses): Chart
        + generatePieChart(expenses): Chart
        + calculateCategoryDistribution(expenses): Object
    }

    class ShoppingListContext {
        - itemId: String
        - userId: String
        - itemName: String
        - quantity: Int
        - status: Boolean
        + addItem(item): Boolean
        + updateItem(itemId, updates): Boolean
        + deleteItem(itemId): Boolean
        + getShoppingList(userId): List
    }

    class InternationalizationContext {
        + translateText(languageCode, text): String
        + setUserLanguage(userId, languageCode): Boolean
    }

    %% Relationships
    UserContext --> ExpenseContext : "Tracks Expenses"
    UserContext --> BudgetContext : "Defines Budgets"
    UserContext --> ShoppingListContext : "Manages Shopping List"
    ExpenseContext --> VisualizationContext : "Provides Data"
    BudgetContext --> VisualizationContext : "Provides Data"
    UserContext --> InternationalizationContext : "Handles Language Preferences"