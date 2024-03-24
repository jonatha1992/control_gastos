import { useMemo } from "react";
import { formatDate } from "../helpers/Index";
import { Expense } from "../types/Index";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categorias";
import { LeadingActions, SwipeableList, SwipeableListItem, TrailingActions, SwipeAction } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
    expense: Expense;
};

const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
    const { dispatch } = useBudget();

    const categoryInfo = useMemo(() => categories.filter((c) => c.id === expense.category)[0], [expense]);

    const leadingActions = () => {
        return (
            <LeadingActions>
                <SwipeAction onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })}>
                    Actualizar
                </SwipeAction>
            </LeadingActions>
        );
    };
    const trailingActions = () => {
        return (
            <TrailingActions>
                <SwipeAction
                    onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
                    destructive={true}
                >
                    Eliminar
                </SwipeAction>
            </TrailingActions>
        );
    };
    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={20} leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <div className=" bg-white shadow-lg p-10 w-full border-b border-gray-200 mt-1 gap-5 flex items-center ">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className="w-20 h-20" />
                    </div>
                    <div className="flex-1 space-y-3">
                        <p className="text-gray-500 font-bold uppercase ">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-gray-500">{formatDate(expense.date!.toString())}</p>
                    </div>
                    <AmountDisplay amount={expense.amount} />,
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

export default ExpenseDetail;
