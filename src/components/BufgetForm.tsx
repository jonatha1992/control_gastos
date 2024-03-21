import { useState, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";

const BudgetForm = () => {
    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setBudget(event.target.valueAsNumber);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ type: "add-budget", payload: { budget } });
    };

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl  text-blue-500 font-bold text-center ">
                    Defenir presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    name="budget"
                    placeholder="Definir presupuesto"
                    className="border-2 border-gray-300 p-2  hover:border-gray-500  text-center font-bold"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                id="budget"
                type="submit"
                name="budget"
                value={"Añardir presupuesto"}
                className="border-2 bg-blue-500 p-2  hover:bg-blue-600  text-center font-bold text-white w-full disabled:opacity-40"
                onClick={() => setBudget(Number(budget))}
                disabled={isValid}
            />
        </form>
    );
};

export default BudgetForm;
