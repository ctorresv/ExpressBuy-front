import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (search !== "") {
            navigate("/products?name=" + search)
        }

    }, [search])
    return (
        <div className="form-input w-96 flex flex-row gap-x-2 items-center border-2 border-bg-dark rounded-lg focus-within:border-2 focus-within:border-primary-600">
            <MagnifyingGlassIcon class="h-6 w-6 text-paragraph-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full placeholder:text-paragraph-secondary focus-visible:outline-none" type="text" name="search" placeholder="Search" />
        </div>
    )
}