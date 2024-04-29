import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ProductCard } from './ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import cartActions from '../../store/user/cart/cartActions'
import { parsePrice } from '../../utils/handleData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const { clear_cart, add_address } = cartActions

export function Slideover({ open, setOpen }) {
    const { products, cart_id, address } = useSelector(store => store.user.cart)
    const { addresses } = useSelector(store => store.user.data)
    const navigate = useNavigate()
    function handleChange(e) {
        console.log("entre")
        let address_id = { address_id: e.target.value }

        dispatch(add_address({ address_id, cart_id }))
    }
    function handleCheckout() {
        if (address) {
            navigate("/checkout/details")
        } else {
            toast.error("you have to set a address of shipment")
        }

    }
    const dispatch = useDispatch()
    function handleAddAddress() {
        navigate("/adresses/create")
    }
    function handleClear() {
        dispatch(clear_cart({ cart_id }))
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
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
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
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
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
                                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 flex flex-col justify-start items-start">
                                                Your cart
                                                {addresses?.length > 0 ?
                                                    <>
                                                        <p className='text-paragraph-primary font-medium mt-2'>Shipment address</p>
                                                        <select value={address} onChange={handleChange} className='w-full border rounded-lg p-2 mt-2'>
                                                            <option value="">No one</option>
                                                            {addresses.map((address) => {
                                                                return <option key={address._id} selected={address._id === address} value={address._id}>
                                                                    {address.name}
                                                                </option>
                                                            })}

                                                        </select>
                                                    </>

                                                    : <button onClick={handleAddAddress} className='w-full border flex flex-row gap-2 items-center justify-center bg-bg-medium text-paragraph-secondary p-2 rounded-lg my-2'>Create address <PlusCircleIcon className='w-6 h-6 stroke-paragraph-secondary' /></button>}
                                            </Dialog.Title>

                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            {products.length > 0 ?
                                                <div className='flex flex-col justify-start items-center flex-1 h-full divide-y-2 gap-4'>
                                                    <button onClick={handleClear} className='w-full bg-error-100 text-error-500 py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white'>Empty cart</button>
                                                    <div className='w-full h-full flex flex-col justify-start items-center gap-4 pt-4'>
                                                        {products?.map((product) => <ProductCard product={product} key={product._id} />)}

                                                    </div>
                                                    <div className='w-full text-start p-4'>
                                                        Subtotal: ${parsePrice(products.reduce(
                                                            (accumulator, currentValue) => accumulator + currentValue?.product_id?.price * currentValue.quantity,
                                                            0
                                                        ))}
                                                    </div>
                                                    <div className='w-full my-4'>
                                                        <button onClick={handleCheckout} className='bg-success-100 text-success-500 w-full rounded-lg p-2 my-2 hover:bg-success-500 hover:text-white'>Checkout</button>
                                                    </div>
                                                </div> :
                                                <div className='w-full h-full flex flex-col justify-center items-center'>
                                                    <p className='text-paragraph-secondary'>No products in the cart</p>
                                                </div>

                                            }

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