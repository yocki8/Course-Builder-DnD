import React, { useState } from "react";
import { useData } from "./DataContext";
import { RxCross2 } from "react-icons/rx";

const Title = ({ title, cancelOperation }) => {
    const { itemToEditId } = useData();

    return (    
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
                {itemToEditId ? "Edit" : "create new"} {title}
            </h1>
            <button onClick={cancelOperation}>
                <RxCross2 size={25} />
            </button>
        </div>
    );
};

const Inputs = ({ title, updateInputFields }) => {
    let labelNames = [];
    if (title === "Module") labelNames = ["Module Name"];
    else if (title === "Link") labelNames = ["URL", "Display Name"];
    else labelNames = ["File Name"];

    return (
        <div className="grid gap-4">
            {labelNames.map((labelName, index) => {
                return (
                    <div
                        name={labelName}
                        className="grid gap-2"
                        key={labelName}
                    >
                        <p className="font-medium">{labelName}</p>
                        <input
                            id={labelName}
                            value={"hi"}
                            className="w-[min(400px,60dvw)] rounded-md border px-3 py-2"
                            onChange={(e) =>
                                updateInputFields(e.target.value, index)
                            }
                            placeholder={`Enter ${labelName}`}
                            type="text"
                            autoFocus={index == 0}
                        ></input>{" "}
                    </div>
                );
            })}
        </div>
    );
};

const Buttons = ({ cancelOperation, renameItem, createItem }) => {
    const { itemToEditId } = useData();
    return (
        <div className="ml-auto flex gap-3 font-semibold">
            <button
                onClick={cancelOperation}
                className="rounded-lg border px-2 py-1 text-gray-600 md:px-5 md:py-3"
            >
                Cancel
            </button>
            <button
                onClick={() => (itemToEditId ? renameItem() : createItem())}
                className="rounded-lg bg-blue-400 px-2 py-1 text-white md:px-5 md:py-3"
            >
                {itemToEditId ? "Save Changes" : "Create"}
            </button>
        </div>
    );
};

const Toast = () => {
    return (
        <div className="-my-5 text-red-500 rounded-lg p-2 ">
            <h1>Please fill all the fields</h1>
        </div>
    );
};
export default function Card() {
    const {
        isAdding,
        itemToEditId,
        handleIsAdding,
        editItems,
        addItems,
        handleitemToEditId,
    } = useData();
    const [inputFields, setInputFields] = useState(new Array(isAdding == 1 || isAdding == 3 ? 1 : 2).fill(""));

    const [showToast,setShowToast] = useState();

    let title = "";
    if (isAdding == 1) title = "Module";
    else if (isAdding == 2) title = "Link";
    else title = "Resource";

    const updateInputFields = (value, index) => {
        const inputFieldsCpy = [...inputFields];
        inputFieldsCpy[index] = value;
        setInputFields(inputFieldsCpy);
    };

    const cancelOperation = () => {
        handleIsAdding(0);
        handleitemToEditId(0);
    };

    const isAnyOfInputEmpty = () => {
        return inputFields.includes("");
    };
    const createItem = () => {
        if (isAnyOfInputEmpty()){
            setShowToast(true);
            return;
        }

        let newItem;
        if (isAdding == 1) {
            newItem = {
                id: Date.now(),
                name: inputFields[0],
                type: "module",
                canHaveChildren: (dragItem) => dragItem.type != "module",
            };
        } else {
            newItem = {
                id: Date.now(),
                url: inputFields[0],
                name: inputFields[1],
                type: "link",
                canHaveChildren: false,
            };
        }
        addItems(newItem);
        cancelOperation();
    };

    const renameItem = () => {
        if (isAnyOfInputEmpty()){
            setShowToast(true);
            return;
        }

        let modifiedItem;
        if (isAdding == 1 || isAdding == 2) {
            modifiedItem = {
                name: inputFields[0],
            };
        } else {
            modifiedItem = {
                name: inputFields[0],
                url: inputFields[1],
            };
        }

        editItems(modifiedItem);
        cancelOperation();
    };
    return (
        <div
            onKeyDown={(e) => {
                if (e.key == "Enter") {
                    if (itemToEditId) renameItem();
                    else createItem();
                }
                if (e.key == "Escape") cancelOperation();
            }}
            className="relative grid h-dvh place-items-center bg-[rgba(0,0,0,0.4)] "
        >
            <div className="grid gap-8 rounded-md bg-white px-8 py-8 shadow-[5px_5px_10px_5px_rgba(0,0,0,0.4)] md:px-16">
                <Title cancelOperation={cancelOperation} title={title} />
                <Inputs title={title} updateInputFields={updateInputFields} />
                {showToast && <Toast />}
                <Buttons
                    createItem={createItem}
                    renameItem={renameItem}
                    cancelOperation={cancelOperation}
                />
            </div>
        </div>
    );
}
