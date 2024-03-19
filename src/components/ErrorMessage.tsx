import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
    return <p className=" bg-red-600 py-2 text-center text-white font-bold uppercase">{children}</p>;
};

export default ErrorMessage;
