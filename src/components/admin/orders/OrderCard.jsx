import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api, headers } from "../../../utils/api"
import { LS } from "../../../utils/localStorageUtils"
import { parsePrice } from "../../../utils/handleData"


const status = {
    pending: "bg-gray-200 text-gray-500",
    paid: "bg-success-100 text-success-500",
    shipped: "bg-success-100 text-success-500",
    delivered: "bg-success-100 text-success-500",
    cancel: "bg-error-100 text-error-500"
}
const statusButton = {
    pending: {
        path: "cancel",
        text: "cancel order",
        style: "bg-error-100 text-error-500 hover:bg-error-500 hover:text-white",
        endpoint: "/orders/cancel/"
    },
    paid: {
        path: "shipped",
        text: "Dispatch",
        style: "bg-success-100 text-success-500 hover:bg-success-500 hover:text-white",
        endpoint: "/orders/shipped/"
    },
    shipped: {
        path: "delivered",
        text: "Delivered",
        style: "bg-success-100 text-success-500 hover:bg-success-500 hover:text-white",
        endpoint: "/orders/delivered/"
    },
    delivered: {
        path: "notification",
        text: "Send mail",
        style: "bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white",
        endpoint: "/orders/notification/"
    },
    cancel: {
        path: "notification",
        text: "send mail",
        style: "bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white",
        endpoint: "/orders/notification/"
    }
}

export function OrderCard({ staticOrder }) {
    const [order, setOrder] = useState(staticOrder)
    const navigate = useNavigate()
    function handleClick() {
        api.put(statusButton[order?.status].endpoint + order._id, null, headers(LS.get("token")))
            .then(setStatus()).catch(console.log(error))
    }
    function setStatus() {
        setOrder((state) => {
            return {
                ...state,
                status: statusButton[state.status].path != "notification" ? statusButton[state.status].path : state.status
            }


        })
    }
    function handleNavigate(){
        navigate(`/admin/orders/${order._id}`, { state:  order  });
    }
    return (
        <div className="lg:grid lg:grid-cols-7 md:grid md:grid-cols-7 grid grid-cols-4 items-center border-b py-2 text-paragraph-primary text-sm ">
            <div className="p-2 ">
                <div className={`text-sm rounded-full text-center ${status[order?.status]}`}>
                    {order?.status}
                </div>

            </div>
            <div className="text-center">
                #{order?.n_order}
            </div>
            <div className="capitalize text-center hidden md:block lg:block">
                {order?.user_id?.name}{order?.user_id?.last_name}
            </div>
            <div className="capitalize text-center hidden md:block lg:block">
                {order?.products?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.quantity,
                    0
                )}
            </div>
            <div className="text-center hidden md:block lg:block">
                ${parsePrice(order?.total_price)}
            </div>
            <button onClick={handleNavigate}  className="text-primary-500 underline text-center">
                Details
            </button>
            <button onClick={() => handleClick(order?._id)} className={`${statusButton[order?.status]?.style}  rounded-lg p-2 text-center`}>
                {statusButton[order?.status]?.text}
            </button>

        </div>
    )
}