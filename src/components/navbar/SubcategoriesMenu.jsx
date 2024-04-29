import { Popover } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
export function PopoverButton({ category, subcategories }) {
    const navigate = useNavigate()
    function handleClick(cb, id) {
        navigate({
            pathname: '/products',
            search: `?category_id=${category._id}&subcategory_id=${id}&page=1`
        })
    }
    return (
        <Popover className="relative">
            <Popover.Button className='rounded-lg px-4 py-2 capitalize font-medium flex flex-row gap-x-2 items-center'>{category?.name} <ChevronDownIcon className="h-5 w-5 flex-none text-paragraph-secondary" /> </Popover.Button>
            <Popover.Panel className="absolute z-10 bg-white rounded-lg mt-4 min-w-[300px] shadow-2xl">
                {({ close }) => (
                    <div className="flex flex-col justify-start items-start p-4 gap-4">
                        {subcategories?.map((item) =>
                            <button key={item._id} onClick={(close) => handleClick(close, item._id)} to={`/products?subcategory="${item._id}"`}
                                className='font-medium rounded-lg border-b p-2 text-paragraph-primary w-full flex flex-row justify-between items-center hover:bg-bg-medium break-words'>
                                {item.name} <ChevronRightIcon className="h-5 w-5 flex-none text-paragraph-secondary" />
                            </button>)}
                    </div>
                )}
            </Popover.Panel>
        </Popover>
    )
}