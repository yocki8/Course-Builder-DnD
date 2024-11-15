import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import { IoIosArrowDown, IoIosLink } from "react-icons/io";
import { LuRows } from "react-icons/lu";
import { useData } from "./DataContext";

const Button = ({ addOptions, toggleAddOptions }) => {
    return (
        <button
            id="add-button"
            onClick={toggleAddOptions}
            className="flex items-center gap-3 rounded-md bg-[#D33852] px-4 py-2 text-white  transition duration-100 hover:bg-[#b72f46]"
        >
            <FaPlus />
            <h1>Add</h1>
            <IoIosArrowDown
                className={`${!addOptions ? "rotate-180" : "rotate-0"} stroke-[40px] transition-all duration-100 `}
            />
        </button>
    );
};

const Option = ({ type = 0, fireUpload = () => {}, title, children }) => {
    const { handleIsAdding } = useData();
    return (
        <li>
            <button
                onClick={(e) => {
                    handleIsAdding(type);
                    fireUpload();
                    e.target.blur();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-base  opacity-50 transition-all duration-100 hover:bg-gray-200 hover:font-semibold hover:opacity-100"
            >
                {children}
                <h1>{title}</h1>
            </button>
        </li>
    );
};

const OptionList = ({ addOptions }) => {
    const fileInputRef = useRef();

    const {addItems} = useData();

    const fireUpload = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                file.data = reader.result;

                if (
                    file.type == "application/pdf" ||
                    file.type == "image/png" ||
                    file.type == "image/jpeg" ||
                    file.type == "image/jpg"
                ) {
                    const newItem = {
                        id: Date.now(),
                        name: file.name,
                        file: file,
                        type: (file.type=='application/pdf' ? 'pdf' :'img'),
                        canHaveChildren: false,
                    };

                    addItems(newItem);
                }
            };
            reader.readAsDataURL(file);
        }

    };
    return (
        <ul
            className={`${addOptions ? "translate-y-3 opacity-100" : "opacity-0 pointer-events-none"} absolute z-10 right-0 w-56  rounded-md bg-white py-2  shadow-[3px_3px_10px_rgba(0,0,0,0.2)] transition-all duration-300`}
        >
            <Option type={1} title={"Create module"}>
                <LuRows size={15} />
            </Option>
            <Option type={2} title={"Add a link"}>
                <IoIosLink size={15} />
            </Option>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.jpeg,.jpg,.png"
                onChange={handleFileChange}
            />
            <Option fireUpload={fireUpload} title={"Upload"}>
                <GoUpload />
            </Option>
        </ul>
    );
};
export default function AddButton() {

    const {addOptions,toggleAddOptions} = useData();

    return (
        <div className="relative">
            <Button addOptions={addOptions} toggleAddOptions={toggleAddOptions} />
            <OptionList addOptions={addOptions} />
        </div>
    );
}
