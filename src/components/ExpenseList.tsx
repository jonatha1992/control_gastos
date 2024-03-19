import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

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
        </div>
    );
};

export default ExpenseList;
