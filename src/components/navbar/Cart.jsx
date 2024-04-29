import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { Slideover } from "./Slideover"
import { useState } from "react"
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
export function Cart() {
    const { products } = useSelector(store => store.user.cart)
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="absolute w-4 h-4 rounded-full text-sm bg-primary-600 top-[-5px] right-[2px] flex flex-row justify-center items-center text-white p-[10px]">{products.length}</div>
            <ShoppingCartIcon onClick={() => setOpen(true)} class="h-6 w-6 text-paragraph-primary hover:text-primary-600" />
            <Slideover open={open} setOpen={setOpen}/>
        </>
    )
}