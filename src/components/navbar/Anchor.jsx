import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
export function Anchor({ subcategory }) {
    return (
        <>
            <Link to={`/products?subcategory="algo"`}
                className='font-medium rounded-lg border p-2 text-paragraph-primary w-full flex flex-row justify-between items-center hover:bg-bg-medium'>
                Algo <ChevronRightIcon className="h-5 w-5 flex-none text-paragraph-secondary" />
            </Link>

            {/* <Link key={subcategory._id} to={`/products?subcategory="${subcategory._id}"`}
            className='font-medium rounded-lg border p-2 text-paragraph-primary w-full flex flex-row justify-between items-center hover:bg-bg-medium'>
            {subcategory.name} <ChevronRightIcon className="h-5 w-5 flex-none text-paragraph-secondary" />
        </Link> */}
        </>
    )
}