import { useDispatch, useSelector } from "react-redux"
import { Popover } from '@headlessui/react'
import { Link } from "react-router-dom"
import actions from "../../store/user/auth/authActions"

const {sign_out} = actions
export function Avatar() {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.user.data)
    function handleClick(){
        dispatch(sign_out())
    }
    return (
        <Popover className="relative">
            <Popover.Button className='w-6 h-6 rounded-full border overflow-hidden'>
                <img src={user?.photo} className='w-full h-full object-cover' alt="" />
            </Popover.Button>

            <Popover.Panel className="absolute right-0 w-40 z-10 bg-white shadow-2xl p-4 rounded-lg">
                <div className="flex flex-col justify-start items-start gap-4">
                    <Link to={"/user/profile"} className="w-full border text-paragraph-primary py-1 px-2 rounded-lg hover:bg-bg-medium font-medium text-center">Profile</Link>
                    <Link to={"/user/orders"} className="w-full border text-paragraph-primary py-1 px-2 rounded-lg hover:bg-bg-medium font-medium text-center">Orders</Link>
                    <button onClick={handleClick} className="w-full border border-error-500 bg-error-100 px-2 py-1 font-medium text-error-500 rounded-lg">Sign out</button>
                </div>

                <img src="/solutions.jpg" alt="" />
            </Popover.Panel>
        </Popover>

    )
}