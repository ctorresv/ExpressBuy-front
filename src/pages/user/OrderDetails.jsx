import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ProductDetail } from "../../components/admin/orders/ProductDetails"
import { ChevronLeftIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { api, headers } from "../../utils/api"
import { LS } from "../../utils/localStorageUtils"
import { parsePrice } from "../../utils/handleData"

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

export function OrderDetails() {
    const location = useLocation()
    const [order, setOrder] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        setOrder(location.state)
    }, [location])

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

    function handleCancel() {
        api.put("/orders/cancel/" + order._id, null, headers(LS.get("token"))).then(
            res => setOrder((state) => {
                return {
                    ...state,
                    status: "cancel"
                }
            }).catch(console.log(error))
        )
    }
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
        <div className="w-full h-full p-4">
            <button onClick={() => navigate(-1)} className="bg-primary-500 text-white p-1 rounded-lg flex flex-row w-[120px] items-center"> <ChevronLeftIcon className="w-6 h-6 stroke-white fill-white" />Go back</button>
            <div className="w-full flex flex-row justify-between items-center border-b border-t my-4">
                <div className="w-full font-medium flex flex-col justify-start items-start my-4">
                    <p className="text-paragraph-secondary font-normal text-sm ">No. order #{order?.n_order}</p>
                    <p className="text-paragraph-primary font-medium">{order?.user_id?.name}{order?.user_id?.last_name}</p>
                </div>
                <div>
                    {order?.status === "pending" &&
                        <div className="flex flex-row justify-between gap-4">
                            <button onClick={handlePayment} className="w-[150px] bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-500">Pay</button>
                            <button onClick={handleCancel} className="w-[150px] bg-error-100 text-error-500 p-2 rounded-lg hover:bg-error-500 hover:text-white">Cancel</button>
                        </div>}
                </div>
            </div>

            <div className="w-full h-full lg:flex lg:flex-row flex flex-col justify-center items-start gap-2 ">
                <div className="grow order-2 w-full lg:order-1 border rounded-lg p-4">
                    <div className="mb-8 text-lg">Products details</div>
                    <div className="grid grid-cols-5">
                        <div className="col-span-3 ">Name</div>
                        <div>Quantity</div>
                        <div >Price</div>

                    </div>
                    {order?.products?.map((item) => <ProductDetail product={item} key={item} />)}
                    <div className="w-full flex flex-row justify-end mt-4">
                        Subtotal: $ {parsePrice(order?.total_price)}
                    </div>
                    <div className="w-full flex flex-row justify-end mt-4 font-bold">
                        Total: $ {parsePrice(order?.total_price)}
                    </div>
                </div>
                <div className="bg-bg-light lg:w-1/3 w-full order-1 p-4 rounded-lg border">
                    <div className="w-full border-b pb-4">
                        <p className="text-paragraph-primary font-medium">Amount</p>
                        <div className="flex flex-row justify-between w-full">
                            <p>${parsePrice(order?.total_price)}</p>
                            <div className={`text-sm rounded-full p-1 max-w-[100px] text-center ${status[order?.status]}`}>
                                {order?.status}
                            </div>
                        </div>

                    </div>
                    <div className="my-4">
                        <p className="flex flex-row justify-start items-center gap-2">
                            <UserCircleIcon className="w-6 h-6 stroke-bg-bg-dark fill-bg-dark" />
                            {order?.user_id?.name} {order?.user_id?.last_name}
                        </p>
                    </div>

                </div>
            </div>

        </div>

    )
}