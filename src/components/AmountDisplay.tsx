import { formatCurrency } from "../helpers/Index";

type AmountDisplayProps = {
    label: string;
    amount: number;
};
const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label}: <span className="text-black font-black ">{formatCurrency(amount)}</span>{" "}
        </p>
    );
};

export default AmountDisplay;
