import React from "react";
import { useData } from "./DataContext";
import { SortableTree, SimpleTreeItemWrapper } from "dnd-kit-sortable-tree";
import { MdOutlineDragIndicator } from "react-icons/md";
import clsx from "clsx";
import ItemRow from "./ItemRow";
import emptyBoxSvg from '/svg/emptyBoxLogo.svg'
import {
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCenter,
} from "@dnd-kit/core";

import { snapCenterToCursor } from "@dnd-kit/modifiers";

function ItemTree() {
    const { items, handleItems } = useData();
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);

    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    return (
        <div className="mt-4">
            <SortableTree
                // dropAnimation={false}
                items={items}
                onItemsChanged={handleItems}
                dndContextProps={{
                    sensors,
                    collisionDetection: closestCenter,
                    modifiers: { snapCenterToCursor },
                }}
                indentationWidth={0.0001}
                TreeItemComponent={MinimalTreeItemComponent}
            />
        </div>
    );
}

const MinimalTreeItemComponent = React.forwardRef((props, ref) => {
    const isFirst = !props.depth;
    const isChild = props.depth;
    const isLast = !props.childCount && (props.isLast || !props.depth);
    const isGhostOverChilds = props.ghost && props.depth;
    const isGhost = props.ghost;

    return (
        <SimpleTreeItemWrapper
            style={{ opacity: 0 }}
            {...props}
            showDragHandle={false}
            disableCollapseOnItemClick={true}
            hideCollapseButton={true}
            manualDrag={true}
            ref={ref}
        >
            <div
                className={clsx(
                    "group flex w-full items-center",
                    isFirst && "pt-4",
                )}
            >
                <button
                    {...props.handleProps}
                    className={clsx(
                        "absolute -left-12 p-4 opacity-0 group-hover:opacity-100",
                        isGhostOverChilds && "opacity-0",
                        isGhost && !isChild && "opacity-100",
                    )}
                >
                    <MdOutlineDragIndicator size={25} />
                </button>

                <div
                    id={props.item.id}
                    className={clsx(
                        "flex w-full hover:bg-gray-200 items-center border-y p-4",
                        isFirst && "rounded-t-lg",
                        isLast && "rounded-b-lg  border-b-black/30",
                        isChild && "pl-12",
                        !isGhostOverChilds && "bg-white",
                        isGhost &&
                            "rounded-lg border-2  border-y-2 border-blue-500 border-b-blue-500",
                        isGhostOverChilds &&
                            "rounded-none bg-blue-600 p-[1.5px]",
                    )}
                >
                    {" "}
                    <div
                        className={clsx(
                            isGhostOverChilds && "hidden",
                            "w-full ",
                        )}
                    >
                        <ItemRow item={props.item} />
                    </div>
                </div>
            </div>
        </SimpleTreeItemWrapper>
    );
});

const EmptyBox = ()=>{
    return(
        <div className="w-fit text-center m-auto translate-y-40">
            <img src={emptyBoxSvg}></img>
            <h1 className="text-xl font-bold">Nothing Added here yet</h1>
            <p>click on the [+] add button to add items</p>
        </div>
    )
}
export default function Content() {
    const { items } = useData();

    if(items.length) return <ItemTree />
    else return <EmptyBox />
}
