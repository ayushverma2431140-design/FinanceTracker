export type TransactionType = 'income' | 'expense';

export type Category = 
  // Income categories
  | 'Salary' | 'Freelance' | 'Investments' | 'Other Income'
  // Expense categories
  | 'Housing' | 'Transportation' | 'Food' | 'Utilities' | 'Insurance' 
  | 'Healthcare' | 'Saving & Debt' | 'Personal Spending' | 'Entertainment' | 'Miscellaneous';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  description: string;
}

export interface Budget {
  id: string;
  category: Category;
  amount: number;
  period: 'monthly';
  rollover?: boolean;
}

export interface User {
  name: string;
  email: string;
}
