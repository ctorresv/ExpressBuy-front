import { HomeIcon, TruckIcon,ShoppingBagIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <NavLink to={"/admin/"} className=" text-paragraph-secondary flex flex-row items-center gap-2 hover:text-primary-600 hover:bg-bg-light w-full p-2 rounded-lg my-2 " style={({ isActive }) => { return {  color: isActive ? "#4f46e5" : "#6B7280", fontWeight: isActive ? "600" : "400", backgroundColor: isActive ? "#eef2ff" : "transparent" } }}>
               <HomeIcon className="w-4 h-4 stroke-2"/> Home
            </NavLink>
            <NavLink to={"/admin/products?page=1"} className=" text-paragraph-secondary flex flex-row items-center gap-2 hover:text-primary-600 hover:bg-bg-light w-full p-2 rounded-lg my-2 " style={({ isActive }) => { return {  color: isActive ? "#4f46e5" : "#6B7280", fontWeight: isActive ? "600" : "400", backgroundColor: isActive ? "#eef2ff" : "transparent" } }}>
               <ShoppingBagIcon className="w-4 h-4 stroke-2"/> Products
            </NavLink>
            <NavLink to={"/admin/orders?page=1"} className=" text-paragraph-secondary flex flex-row items-center gap-2 hover:text-primary-600 hover:bg-bg-light w-full p-2 rounded-lg my-2 " style={({ isActive }) => { return {  color: isActive ? "#4f46e5" : "#6B7280", fontWeight: isActive ? "600" : "400", backgroundColor: isActive ? "#eef2ff" : "transparent" } }}>
               <TruckIcon className="w-4 h-4 stroke-2"/> Orders
            </NavLink>
        </div>
    )
}