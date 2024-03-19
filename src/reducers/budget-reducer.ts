import { DraftExpense, Expense } from "../types/Index";
import { v4 as uuid } from "uuid";

export type BudgetActions =
    | {
          type: "add-budget";
          payload: { budget: number };
      }
    | {
          type: "show-modal";
      }
    | {
          type: "close-modal";
      }
    | {
          type: "add-expense";
          payload: { expense: DraftExpense };
      };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
};

export const inicialState: BudgetState = {
    budget: 0,
    modal: false,
    expenses: [],
};

const createExpense = (DraftExpense: DraftExpense): Expense => {
    return {
        id: uuid(),
        ...DraftExpense,
    };
};

export const budgetReducer = (state: BudgetState = inicialState, action: BudgetActions) => {
    switch (action.type) {
        case "add-budget":
            return {
                ...state,
                budget: action.payload.budget,
            };
        case "show-modal":
            return {
                ...state,
                modal: true,
            };
        case "close-modal":
            return {
                ...state,
                modal: false,
            };
        case "add-expense": {
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false,
            };
        }

        default:
            return state;
    }
};
