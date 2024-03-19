import React from "react";
import AmountDisplay from "./AmountDisplay";
const BudgetTacker = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex justify-center">
                    <img src="/grafico.jpg" alt="Grafico" />
                </div>
                <div className="flex flex-col justify-center items-center gap-8">
                    <button className=" uppercase border-2 bg-pink-500 p-2  hover:bg-pink-600  text-center font-bold text-white w-full rounded-lg">
                        Reseteaer app
                    </button>
                    <AmountDisplay label="Presupuesto" amount={300} />
                    <AmountDisplay label="Disponible" amount={200} />
                    <AmountDisplay label="Gastado" amount={100} />
                </div>
            </div>
        </div>
    );
};

export default BudgetTacker;
