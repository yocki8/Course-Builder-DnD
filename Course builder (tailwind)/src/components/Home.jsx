import React from "react";
import Header from "./Header";
import Content from "./Content";

export default function Home() {
    return (
        <div className=" px-[max(32px,15%)] py-8">
            <Header />
            <Content />
        </div>
    );
}
