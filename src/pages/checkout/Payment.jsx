import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { api } from "../../utils/api"
import { parsePrice } from "../../utils/handleData"
import { UserCircleIcon } from "@heroicons/react/24/solid"
const status = {
    pending: "bg-gray-200 text-gray-500",
    paid: "bg-success-100 text-success-500",
    shipped: "bg-success-100 text-success-500",
    delivered: "bg-success-100 text-success-500",
    cancel: "bg-error-100 text-error-500"
}

export function Payment() {
    const [order, setOrder] = useState(null)
    let location = useLocation()
    useEffect(() => {
        setOrder(location.state)
    }, [location])
    function handlePayment() {
        let postOrder = {
            order_id: order._id,
            id: order._id,
            description: "order payment",
            quantity: 1,
            unit_price: order.total_price
        }
        api.post("paymments", postOrder).then((res) => (window.location.href = res.data.response.body.init_point)).catch(err => console.log(err))
    }
    return (
        <div className="flex flex-col w-full h-full items-center gap-8">
                <div className="w-4/6 mt-4 border rounded-lg p-8">
                    <div className="font-bold border-b mb-4">Order details</div>
                    
                    <div className="w-full h-5/6 flex flex-col justify-around gap-4">
                        <div className="w-full flex gap-3 border-b">
                            <p className="font-bold">Nr.Order:</p>
                            #{order?.n_order}
                        </div>
                        <div className="flex-row flex gap-3 border-b">
                            <p className="font-bold ">Quantity of products:</p>
                            {order?.products.length}
                        </div>
                        <div className="flex-row flex gap-3 ">
                            <p className="font-bold">Total:</p>
                             ${parsePrice(order?.total_price)}
                        </div>
                    </div>
                </div>
            <button onClick={handlePayment} className="w-4/6 bg-primary-600 my-4 hover:bg-primary-500 text-white p-2 rounded-lg">Pay</button>
        </div>
    )
}