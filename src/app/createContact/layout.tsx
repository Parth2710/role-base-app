import React, { ReactNode } from "react";
import Navbar from "../components/navbar";

interface CreateContactLayoutProps {
    children: ReactNode;
}

const CartLayout: React.FC<CreateContactLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default CartLayout;
