import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
    const { state } = useBudget();

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);
    return (
        <div className="mt-10">
            {isEmpty ? (
                <p className="text-center text-gray-500 font-bold text-3xl"> No hay Gastos</p>
            ) : (
                <p className="text-center text-gray-500 font-bold text-3xl">Listado de Gastos</p>
            )}

            <ul className="space-y-4">
                {state.expenses.map((expense) => (
                    <li key={expense.id}>
                        <ExpenseDetail expense={expense} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
