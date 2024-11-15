import React, { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext();
import { items as exportedItems } from "./items";

export const DataProvider = ({ children }) => {
    const [isAdding, setIsAdding] = useState(0);
    const [itemToEditId, setitemToEditId] = useState(null);
    const [items, setItems] = useState(exportedItems);
    const [addOptions, setAddOptions] = useState(false);
    const [editOptions, setEditOptions] = useState(null);

    const toggleAddOptions = () => {
        setAddOptions(!addOptions);
    };

    const hideAddOptions = () => {
        setAddOptions(false);
    };

    const handleEditOptions = (itemId) => {
        if (editOptions == itemId) setEditOptions(null);
        else setEditOptions(itemId);
    };

    const toggleIsAdding = () => {
        setIsAdding(!isAdding);
    };

    const addItems = (newItem) => {
        setItems([newItem,...items]);
    };

    const handleIsAdding = (type) => {
        setIsAdding(type);
    };

    const handleitemToEditId = (itemId) => {
        setitemToEditId(itemId);
    };

    const handleItems = (items) => {
        setItems(items);
    };

    const editItems = (modifiedItem) => {
        const itemsCpy = items.map((item) => {
            if (item.id === itemToEditId) {
                return { ...item, ...modifiedItem };
            }

            if (item.children) {
                const updatedChildren = item.children.map((child) => {
                    if (child.id === itemToEditId) {
                        return { ...child, ...modifiedItem };
                    }
                    return child;
                });

                return { ...item, children: updatedChildren };
            }

            return item;
        });

        setItems(itemsCpy);
    };

    const deleteItem = (itemId) => {
        const itemsCpy = items
            .map((item) => {
                if (item.id === itemId) {
                    return null;
                }

                if (item.children) {
                    const updatedChildren = item.children.filter(
                        (child) => child.id !== itemId,
                    );

                    if (updatedChildren.length !== item.children.length) {
                        return { ...item, children: updatedChildren };
                    }
                }

                return item;
            })
            .filter((item) => item !== null);

        setItems(itemsCpy);
    };

    const findItem = (itemId) => {
        for (const item of items) {
            if (item.id == itemId) return item;
            if (item.children) {
                const child = item.children.find((child) => child.id == itemId);
                if (child) return child;
            }
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            const ele = e.target;
            if (!ele.closest("#add-button")) hideAddOptions();
            if (!ele.closest(".dots")) handleEditOptions(null);
        });
    });

    return (
        <DataContext.Provider
            value={{
                isAdding,
                toggleIsAdding,
                items,
                addItems,
                itemToEditId,
                handleIsAdding,
                handleitemToEditId,
                handleItems,
                addOptions,
                toggleAddOptions,
                editOptions,
                handleEditOptions,
                editItems,
                deleteItem,
                findItem,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
