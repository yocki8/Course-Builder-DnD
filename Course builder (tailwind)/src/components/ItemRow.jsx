import React, { useEffect, useRef, useState } from "react";
import arrowDown from "/svg/arrowDown.svg";
import links from "/svg/links.svg";
import pdf from "/svg/pdf.svg";
import image from "/svg/image.svg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useData } from "./DataContext";
import {
    MdDeleteForever,
    MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import clsx from "clsx";

const Option = ({ title, children, item }) => {
    const { handleitemToEditId, deleteItem, findItem, handleIsAdding } =
        useData();
    const handleClick = (e) => {
        if (title == "Rename") {
            handleitemToEditId(item.id);

            if (item.type == "module") handleIsAdding(1);
            else if (item.type == "link") handleIsAdding(2);
            else handleIsAdding(3);
        }

        if (title == "Delete") {
            deleteItem(item.id);
        }

        if (title == "Download") {
            const itemToDownload = findItem(item.id);

            if(!itemToDownload.file) return;
            const { data: fileData, name: fileName } = itemToDownload?.file;
            
            if (!fileName || !fileData) return;
            console.log(2);
            const link = document.createElement("a");
            link.href = fileData;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return (
        <li>
            <button
                onClick={handleClick}
                className={clsx(
                    "flex w-full items-center gap-3 px-3 py-2 text-base  opacity-50 transition-all duration-100 hover:bg-gray-200 hover:font-semibold hover:opacity-100",
                    title == "Delete" && "border-t-2 text-red-500",
                )}
            >
                {children}
                <h1>{title}</h1>
            </button>
        </li>
    );
};

const LeftSide = ({ item }) => {
    return (
        <div className="flex w-full items-center gap-3">
            {item.type == "module" && <img src={arrowDown}></img>}
            {item.type == "pdf" && <img src={pdf}></img>}
            {item.type == "img" && <img src={image}></img>}
            {item.type == "link" && <img src={links}></img>}

            <div>
                <h1 className="text-sm font-semibold">{item.name}</h1>
                {item.type == "module" && (
                    <p className="text-[10px]">
                        {item?.children?.length
                            ? item.children.length + " resources"
                            : "Add Resources to module"}
                    </p>
                )}
                {item.type != "module" && (
                    <p className="text-[10px]">{item.type}</p>
                )}
            </div>
        </div>
    );
};

const RightSide = ({ item }) => {
    const { editOptions, handleEditOptions } = useData();
    return (
        <div className="relative">
            <button
                onClick={() => handleEditOptions(item.id)}
                className="dots h-full rounded-md px-3 transition-all duration-100 hover:bg-gray-200"
            >
                <HiOutlineDotsVertical />
            </button>
            <ul
                className={`${editOptions == item.id ? "translate-y-2 opacity-100" : "pointer-events-none opacity-0"} absolute right-0 z-10 w-56  rounded-md bg-white py-2  shadow-[3px_3px_10px_rgba(0,0,0,0.2)] transition-all duration-300`}
            >
                <Option item={item} title={"Rename"}>
                    <MdOutlineDriveFileRenameOutline />
                </Option>

                {(item.type == "pdf" || item.type == "img") && (
                    <Option item={item} title={"Download"}>
                        <FaDownload />
                    </Option>
                )}

                <Option item={item} title={"Delete"}>
                    <MdDeleteForever />
                </Option>
            </ul>
        </div>
    );
};
export default function ItemRow({ item }) {
    return (
        <div className="flex w-full justify-between">
            {item.type == "link" ? (
                <a className="w-full" href={"https://"+item.url} target="_blank">
                    <LeftSide item={item} />
                </a>
            ) : (
                <LeftSide item={item} />
            )}
            <RightSide item={item} />
        </div>
    );
}
