import { Avatar } from "../../navbar/Avatar";
import { SearchBar } from "../../admin/navbar/SearchBar";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Slideover } from "./SlideOver";

export function Navbar() {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="w-full h-[50px] border-b flex flex-row justify-between px-10 items-center">
                <Bars3Icon onClick={() => setShow(!show)} className="w-6 h-6 lg:hidden" />
                <SearchBar />
                <Avatar />
            </div>
            <Slideover open={show} setOpen={setShow} />
        </>

    )
}