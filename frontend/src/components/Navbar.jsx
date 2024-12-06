import React from 'react';
import logo from "../assets/logo.jpeg";

function Navbar() {
    return (
        <div className="bg-blue-600 min-h-[25vh] w-full">
            <div className="flex items-center justify-center h-full">
                <img
                    className="rounded-full h-[90%] w-[40%] sm:w-[25%] md:w-[15%] pt-2"
                    src={logo}
                    alt="Logo"
                />
            </div>
        </div>
    );
}

export default Navbar;
