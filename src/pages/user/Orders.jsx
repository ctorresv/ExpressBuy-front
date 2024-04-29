import { useEffect, useState } from "react"
import { api, endpoints, headers } from "../../utils/api"
import { LS } from "../../utils/localStorageUtils"
import { parseDate, parsePrice } from "../../utils/handleData"
import { useNavigate } from "react-router-dom"

const status = {
    pending: "bg-gray-200 text-gray-500",
    paid: "bg-success-100 text-success-500",
    shipped: "bg-success-100 text-success-500",
    delivered: "bg-success-100 text-success-500",
    cancel: "bg-error-100 text-error-500"
}

export function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        api.get(endpoints.get_orders, headers(LS.get("token"))).then(res => setOrders(res.data.orders)).catch(err => console.log(err))
    }, [])
    return (
        <div className="w-full h-full px-4 py-4 lg:px-12">
            <div className="border-b pb-4">
                <h1 className="text-xl text-paragraph-primary font-bold">Order history</h1>
                <p className="text-sm text-paragraph-secondary">Check the status of recent orders, manage returns, and download invoces</p>
            </div>
            <div>
                <div className="w-full border-b my-4 px-4 py-2 grid grid-cols-5">
                    <p className="text-center">Date of creation</p>
                    <p className="text-center">Status</p>
                    <p className="text-center">No. order</p>
                    <p className="text-center">Price</p>
                    <p className="text-center">Info</p>
                </div>
                {orders?.map((order) => {
                    return <div key={order._id} className="w-full border-b my-4 px-4 py-2 grid grid-cols-5">
                        <p className="text-center">
                            {parseDate(order.createdAt)}
                        </p>
                        <p className="flex flex-col justify-center items-center">
                            <div className={`${status[order.status]} rounded-lg text-center lg:w-1/2`}>
                                {order.status}
                            </div>

                        </p>
                        <p className="text-center">#{order.n_order}</p>
                        <p className="text-center">${parsePrice(order.total_price)}</p>
                        <button onClick={() => navigate(`/user/orders/details/${order._id}`, { state: order })} className="text-primary-500 underline text-center">Details</button>
                    </div>
                })}
            </div>

        </div>
    )
}