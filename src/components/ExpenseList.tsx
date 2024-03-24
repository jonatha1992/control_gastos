import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = () => {
    const { state } = useBudget();

    const filtroExpenses = state.currentCategory
        ? state.expenses.filter((expense) => expense.category === state.currentCategory)
        : state.expenses;

    const isEmpty = useMemo(() => filtroExpenses.length === 0, [filtroExpenses]);
    return (
        <div className="mt-10">
            {isEmpty ? (
                <p className="text-center text-gray-500 font-bold text-3xl"> No hay Gastos</p>
            ) : (
                <p className="text-center text-gray-500 font-bold text-3xl">Listado de Gastos</p>
            )}

            <ul className="space-y-4">
                {filtroExpenses.map((expense) => (
                    <li key={expense.id}>
                        <ExpenseDetail expense={expense} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
