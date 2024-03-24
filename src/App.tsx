import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BufgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTacker from "./components/BudgetTacker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";
function App() {
    const { state } = useBudget();

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    useEffect(() => {
        localStorage.setItem("budget", state.budget.toString());
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
    }, [state]);
    return (
        <>
            <header className="bg-blue-600 py-8 ">
                <h1 className="text-3xl font-bold text-white text-center uppercase">Planificador de Gastos</h1>
            </header>

            <div className=" md:max-w-3xl    lg:max-w-3xl  bg-white shadow-lg   mt-2 p-10  mx-auto">
                {isValidBudget ? <BudgetTacker /> : <BudgetForm />}
            </div>
            {isValidBudget && (
                <main className=" max-w-3xl    py-10  mx-auto">
                    <FilterByCategory />
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
}

export default App;
