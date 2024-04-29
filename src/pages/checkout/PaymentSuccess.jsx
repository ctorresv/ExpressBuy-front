import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, headers } from "../../utils/api";
import { LS } from "../../utils/localStorageUtils";
import { useNavigate } from "react-router-dom";


export function PaymentSuccess() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [external_reference, setExternal_reference] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        setExternal_reference(searchParams.get("external_reference"))
    }, [searchParams])
    useEffect(() => {
        api.put("orders/paid/" + external_reference, null).then(res => console.log(res.data)).catch(err => console.log(err))
    }, [external_reference])
    return (
        <div className="w-full flex justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center w-1/2 bg-green-500 h-3/5 rounded-lg">
                <p className="font-[500] px-4 text-center text-[26px] text-white ">Your payment has been processed successfully, in a few moments you will receive an email with the invoice of your purchase, thank you very much.</p>
                <button onClick={() => navigate('/user/orders')} className="bg-white py-3 px-5 rounded-full mt-4 font-[500] hover: transform transition-all duration-300 hover:font-bold hover:scale-125">View Orders</button>
            </div>
        </div>
    )
}
