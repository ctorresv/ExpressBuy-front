import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function SearchBar() {
    const [search, setSearch] = useState("")
    return (
        <div className="hidden w-96 lg:flex lg:flex-row gap-x-2 items-center pb-2">
            <MagnifyingGlassIcon class="h-4 w-4 text-paragraph-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full placeholder:text-paragraph-secondary focus-visible:outline-none text-sm" type="text" name="search" placeholder="Search" />
        </div>
    )
}