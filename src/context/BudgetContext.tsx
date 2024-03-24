import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react";
import { BudgetState, BudgetActions, budgetReducer, initialState } from "../reducers/budget-reducer";

type budgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
    totalExpenses: number;
    remaining: number;
};

type budgetProviderProps = {
    children: ReactNode;
};

export const BudgetContext = createContext<budgetContextProps>(null!);

export const BudgetProvider = ({ children }: budgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    const totalExpenses = useMemo(
        () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
        [state.expenses]
    );
    const remaining = state.budget - totalExpenses;
    return (
        <BudgetContext.Provider value={{ state, dispatch, totalExpenses, remaining }}>
            {children}
        </BudgetContext.Provider>
    );
};
