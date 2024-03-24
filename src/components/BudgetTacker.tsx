import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const BudgetTacker = () => {
    const { state, totalExpenses, remaining, dispatch } = useBudget();
    const percentage = Number(((totalExpenses / state.budget) * 100).toPrecision(2));
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <div className="flex justify-center">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}% Gastado`}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? `#d83232` : `#3b82f6`,
                            textColor: percentage === 100 ? `#d83232` : `#3b82f6`,
                            textSize: 10,
                            trailColor: "#e1deea",
                        })}
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-8">
                    <button
                        className=" uppercase border-2 bg-pink-500 p-2  hover:bg-pink-600  text-center font-bold text-white w-full rounded-lg"
                        onClick={() => dispatch({ type: "reset-app" })}
                    >
                        Reseteaer app
                    </button>
                    <AmountDisplay label="Presupuesto" amount={state.budget} />
                    <AmountDisplay label="Disponible" amount={remaining} />
                    <AmountDisplay label="Gastado" amount={totalExpenses} />
                </div>
            </div>
        </div>
    );
};

export default BudgetTacker;
