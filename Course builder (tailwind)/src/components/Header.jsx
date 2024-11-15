import React from "react";
import AddButton from "./AddButton";

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <h1 className="md:text-2xl text-lg font-bold">Course Builder</h1>
            <AddButton />
        </header>
    );
}
