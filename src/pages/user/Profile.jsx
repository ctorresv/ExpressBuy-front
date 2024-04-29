import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export function Profile() {
    const navigate = useNavigate()
    const { user, addresses } = useSelector(store => store.user.data)
    return (
        <div className="w-[89%]  h-full flex lg:flex-row lg:justify-center lg:items-start md:flex-row flex-col justify-center items-center">
            <div className=" h-1/4 w-32 border mt-2 mx-4 rounded-full flex items-center justify-center">
                <img className="rounded-full h-32 w-32" src={user?.photo} alt="" />
            </div>
            <div className="flex lg:w-3/5  w-11/12 flex-col gap-8">
                <p className="font-bold mt-7">Profile</p>
                <p className="text-sm font-light">This information will be available and it will be possible to make changes if necessary</p>
                <div className="border-b mt-4 grid grid-cols-3">
                    <p className="w-1/4 font-medium">Nombre</p>
                    <p className="w-1/4 ">{user?.name}</p>
                    <button className=" text-primary-700 font-black text-start">Change name</button>
                </div>
                <div className="border-b mt-4 grid grid-cols-3">
                    <p className="w-1/4 font-medium">Last name</p>
                    <p className="w-1/4 ">{user?.last_name}</p>
                    <button className=" text-primary-700 font-black text-start">Change Last name</button>
                </div>
                <div className="border-b mt-4 grid grid-cols-3">
                    <p className="w-1/4 font-medium">Email</p>
                    <p className="">{user?.email}</p>
                </div>
                {addresses?.length > 0 ?
                    <div className="grid grid-cols-3 items-center">
                        <p className='text-paragraph-primary font-medium mt-2'>Shipment address</p>
                        <select className='w-full border rounded-lg p-2 mt-2'>
                            {addresses?.map((address) => {
                                return <option>
                                    {address?.name}
                                </option>
                            })}
                        </select>
                    </div>
                    : <button /* onClick={handleAddAddress} */ className='w-full border flex flex-row gap-2 items-center justify-center bg-bg-medium text-paragraph-secondary p-2 rounded-lg my-2'>Create address <PlusCircleIcon className='w-6 h-6 stroke-paragraph-secondary' /></button>}
                <div className="mt-4 mb-4 grid grid-cols-3">
                    <button onClick={() => navigate("/")} className=" mr-2 bg-primary-700 rounded-lg h-8 font-semibold text-white">Home</button>
                    <button onClick={() => navigate("/user/orders")} className="mx-2 bg-primary-700 rounded-lg h-8 font-semibold text-white">My orders</button>
                    <button onClick={() => navigate("/adresses/me")} className="mr-2 bg-primary-700 rounded-lg h-8 font-semibold text-white">My addresses</button>
                </div>
            </div>


        </div>
    )
}