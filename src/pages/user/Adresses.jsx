import axios from "axios"
import { api, endpoints, headers } from "../../utils/api"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import { LS } from "../../utils/localStorageUtils"
import { useSelector } from "react-redux"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { Profile } from "./Profile"



export function Addresses() {

    const [addresses, setAddresses] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        api.get(endpoints.get_addresses, headers(LS.get("token")))
            .then(res => {
                setAddresses(res.data.addresses)

            })
            .catch(err => console.log(err))
    }, [])

    function editId(id, address) {
        navigate(`/modify/${id}`, { state: address })
    }


    return (
        <div className="w-full h-full flex flex-col overflow-y-scroll">
            {addresses?.length > 0 ?
            <div className="flex flex-col justify-center items-center mt-4">
                <p className='font-bold mt-2'>Your addresses</p>
                <div className='w-11/12 flex flex-col justify-center items-center  border rounded-lg'>
                    {addresses?.map((address) => {
                        return <div className="h-32 w-10/12 grid grid-cols-4">
                            <div className="flex flex-row gap-2 items-center justify-start">
                                <p>Name:</p>
                                {address?.name}
                            </div>
                            <div className="flex flex-row gap-4 items-center justify-center">
                                <p>Direction:</p>
                                <p>{address?.address_line}</p>  
                            </div>
                            <div className="flex flex-row gap-4 items-center justify-center"> 
                                <p>State:</p>
                                <p>{address?.state}</p>
                            </div>
                            <button onClick={()=>editId(address?._id,address)} className="text-primary-700 font-semibold flex  items-center justify-start">Modify</button>
                        </div>
                    })}
                </div>
            </div>
            :   <button  className='w-full border flex flex-row gap-2 items-center justify-center bg-bg-medium text-paragraph-secondary p-2 rounded-lg my-2'>Create address 
                    <PlusCircleIcon className='w-6 h-6 stroke-paragraph-secondary' />
                </button>}
                <div className="w-9/12 flex items-center justify-end">
                    <button onClick={()=>navigate("/adresses/create")} className="text-white bg-primary-700 h-12 w-40 rounded-lg mt-2">Add new address</button>
                </div>
            </div>

    )
}