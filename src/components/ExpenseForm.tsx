import { categories } from "../data/categorias";
import { ChangeEvent, useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { DraftExpense, Value } from "../types/Index";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const { dispatch, state, remaining } = useBudget();
    const [error, setError] = useState("");
    const [previusAmount, setPreviusAmount] = useState(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const isAmountField = ["amount"].includes(name);
        setExpense({ ...expense, [name]: isAmountField ? Number(value) : value });
    };

    const handleChangeDate = (value: Value) => {
        setExpense({ ...expense, date: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (expense.amount - previusAmount > remaining) {
            setError("Ese gasto supera el presupuesto hay fondos suficientes");
            return;
        }
        if (Object.values(expense).includes("")) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setError("");

        if (state.editingId) {
            dispatch({ type: "update-expense", payload: { expense: { ...expense, id: state.editingId } } });
        } else {
            dispatch({ type: "add-expense", payload: { expense } });
        }
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        });
        setPreviusAmount(0);
    };

    useEffect(() => {
        if (state.editingId) {
            setExpense(state.expenses.filter((currenteIds) => currenteIds.id === state.editingId)[0]);
            setPreviusAmount(expense.amount);
        }
    }, [state.editingId]);

    return (
        <form className="space-y-4 " onSubmit={handleSubmit}>
            <legend className="text-2xl font-black uppercase text-center border-b-2 border-blue-500 py-2">
                {state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className=" text-xl font-bold">
                    {" "}
                    Nombre Gasto
                </label>
                <input
                    type="text"
                    id="expenseName"
                    className=" bg-gray-100 p-2       border-blue-500"
                    placeholder="Añade el nombre del gasto"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className=" text-xl font-bold">
                    {" "}
                    Cantidad
                </label>
                <input
                    type="number"
                    id="amount"
                    className="border-2 bg-gray-100 p-2  hover:border-blue-100"
                    placeholder="Añade la cantidad del gasto"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className=" text-xl font-bold">
                    {" "}
                    Categoria
                </label>
                <select
                    id="category"
                    className="border-2 bg-gray-100 p-2  hover:border-blue-100"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className=" text-xl font-bold">
                    {" "}
                    Fecha del Gasto
                </label>
                <DatePicker
                    onChange={handleChangeDate}
                    value={expense.date}
                    className="border-2 bg-gray-100 p-2  border-blue-100"
                />
            </div>
            <input
                type="submit"
                value={state.editingId ? "Guardar Cambios" : "Anadir Gasto"}
                className="w-full bg-blue-500 p-2 text-white uppercase font-bold hover:bg-blue-400 cursor-pointer"
            />
        </form>
    );
};

export default ExpenseForm;
