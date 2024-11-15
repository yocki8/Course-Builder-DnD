import React from "react";
import { useData } from "./components/DataContext";
import Card from "./components/Card";
import Home from './components/Home';

export default function App() {
    const { isAdding } = useData();
    if(isAdding) return <Card />
    else return <Home />
}
