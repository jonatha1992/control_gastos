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
      }
    | {
          type: "remove-expense";
          payload: { id: Expense["id"] };
      }
    | {
          type: "get-by-id";
          payload: { id: Expense["id"] };
      }
    | {
          type: "update-expense";
          payload: { expense: Expense };
      };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    expenseveId: Expense["id"];
};

const inicialBudget = function (): number {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? Number(localStorageBudget) : 0;
};

const inicialExpenses = function (): Expense[] {
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const inicialState: BudgetState = {
    budget: inicialBudget(),
    modal: false,
    expenses: inicialExpenses(),
    expenseveId: "",
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
                expenseveId: "",
            };
        case "add-expense": {
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false,
            };
        }
        case "remove-expense": {
            return {
                ...state,
                expenses: state.expenses.filter((e) => e.id !== action.payload.id),
            };
        }
        case "get-by-id": {
            return {
                ...state,
                expenseveId: action.payload.id,
                modal: true,
            };
        }

        case "update-expense": {
            return {
                ...state,
                expenses: state.expenses.map((x) => (x.id === action.payload.expense.id ? action.payload.expense : x)),
                expenseveId: "",
                modal: false,
            };
        }

        default:
            return state;
    }
};
