import { Fragment } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { ProductCard } from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import cartActions from '../../store/user/cart/cartActions'
import { parsePrice } from '../../utils/handleData'
import { useNavigate } from 'react-router-dom'

const { clear_cart } = cartActions

export function SlideoverMenu({ open, setOpen }) {
    const { categories, subcategories } = useSelector(store => store.menu)
    const navigate = useNavigate()
    function handleClick(category_id, subcategory_id) {
        navigate({
            pathname: '/products',
            search: `?category_id=${category_id}&subcategory_id=${subcategory_id}&page=1`
        })
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pl-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                <h1 className='font-black text-primary-600 text-3xl'>ExBy</h1>
                                            </Dialog.Title>

                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {categories?.map(category => {
                                                return <Disclosure >
                                                    <Disclosure.Button className="py-2 w-full text-start rounded-lg border my-2 px-2 flex flex-row items-center gap-2">
                                                        {category.name} <ChevronDownIcon className='w-4 h-4' />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="text-gray-500">
                                                        <div className="flex flex-col justify-start items-start p-4 gap-4">
                                                            {subcategories?.filter(item => item.category_id === category._id).map((item) =>
                                                                <button key={item._id} onClick={() => handleClick(category._id,item._id)}
                                                                    className='font-medium rounded-lg border p-2 text-paragraph-primary w-full flex flex-row justify-between items-center hover:bg-bg-medium break-words'>
                                                                    {item.name}
                                                                </button>)}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </Disclosure>
                                            })}

                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}