import React, { ReactNode } from "react";
import Navbar from "../components/navbar";

interface ContactLayoutProps {
    children: ReactNode;
}

const CartLayout: React.FC<ContactLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default CartLayout;
