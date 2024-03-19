import { useMemo } from "react";
import BudgetForm from "./components/BufgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTacker from "./components/BudgetTacker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
function App() {
    const { state } = useBudget();

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

    return (
        <>
            <header className="bg-blue-600 py-8 ">
                <h1 className="text-3xl font-bold text-white text-center uppercase">Planificador de Gastos</h1>
            </header>

            <div className=" max-w-2xl   bg-white shadow-lg   mt-2 p-10  mx-auto">
                {isValidBudget ? <BudgetTacker /> : <BudgetForm />}
            </div>
            {isValidBudget && (
                <main className=" max-w-3xl    py-10  mx-auto">
                    <ExpenseList />
                    <ExpenseModal />
                </main>
            )}
        </>
    );
}

export default App;
