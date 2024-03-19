import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { BudgetState, BudgetActions, budgetReducer, inicialState } from "../reducers/budget-reducer";

type budgetContextProps = {
    state: BudgetState;
    dispatch: Dispatch<BudgetActions>;
};

type budgetProviderProps = {
    children: ReactNode;
};

export const BudgetContext = createContext<budgetContextProps>(null!);

export const BudgetProvider = ({ children }: budgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, inicialState);

    return <BudgetContext.Provider value={{ state, dispatch }}>{children}</BudgetContext.Provider>;
};
