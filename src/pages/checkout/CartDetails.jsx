import { useDispatch, useSelector } from "react-redux"
import { ProductCard } from "../../components/navbar/ProductCard"
import { parsePrice } from "../../utils/handleData"
import cartActions from '../../store/user/cart/cartActions'
import { useNavigate } from "react-router-dom"
import { api, cart_endpoint, endpoints, headers } from "../../utils/api"
import { LS } from "../../utils/localStorageUtils"

const { clear_cart, checkout } = cartActions
export function CartDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, cart_id, address } = useSelector(store => store.user.cart)
    const { addresses } = useSelector(store => store.user.data)


    function handleCheckout() {
        console.log(cart_endpoint.checkout + cart_id)
        api.put(cart_endpoint.checkout + cart_id, null, headers(LS.get("token"))).then(res => {
            navigate("/checkout/payment", { state: res.data.order })
            dispatch(checkout())
        })

    }

    function handleClear() {
        dispatch(clear_cart({ cart_id }))
    }

    return (
        <>
            <div className="w-full flex lg:flex-row flex-col justify-center">
                <div className="lg:w-2/12 lg:justify-start w-11/12 flex flex-col justify-center mx-4">
                    {/* <p className=' font-semibold mt-4 text-primary-700 '>Shipment address</p> */}
                    {/* <select defaultValue={address} onChange={handleChange} className='w-full border rounded-lg p-2 mt-2'>
                        {addresses?.map((address) => {
                            return <option key={address._id} selected={address._id === address} value={address._id}>
                                {address.name}
                            </option>
                        })}

                    </select> */}
                </div>

                <div className="lg:w-1/2 w-11/12 mt-4 mx-4 min-h-[80vh]">
                    {products?.length > 0 ?
                        <div className='flex flex-col justify-start items-center flex-1 h-full divide-y-2 gap-4'>
                            <div className='w-full h-full flex flex-col border-y justify-start items-center gap-4 pt-4'>
                                {products?.map((product) => <ProductCard product={product} key={product._id} />)}
                            </div>
                            <div className='w-full text-start p-4'>
                                <p className="font-semibold">Subtotal: ${parsePrice(products.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue?.product_id?.price * currentValue.quantity,
                                    0
                                ))}</p>
                            </div>
                            <div className='w-full flex flex-row justify-between'>
                                <button onClick={handleCheckout} className='bg-success-100 text-success-500 w-1/3 rounded-lg p-2 my-2 hover:bg-success-500 hover:text-white'>Checkout</button>
                                <button onClick={handleClear} className='bg-error-100 text-error-500 w-1/3 rounded-lg p-2 my-2 hover:bg-error-500 hover:text-white'>Empty cart</button>
                            </div>
                        </div> :
                        <div className='w-full h-full flex flex-col justify-center items-center'>
                            <p className='text-paragraph-secondary'>No products in the cart</p>
                        </div>
                    }
                </div>
            </div>
        </>

    )
}