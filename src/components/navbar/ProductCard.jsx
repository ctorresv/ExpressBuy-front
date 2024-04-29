import { TrashIcon } from "@heroicons/react/24/outline"
import cartActions from "../../store/user/cart/cartActions"
import { useDispatch, useSelector } from "react-redux"
import { parsePrice } from "../../utils/handleData"
import { useEffect } from "react"

const {set_product, remove_product} = cartActions

export function ProductCard({product}){
    const {cart_id} = useSelector(store => store.user.cart)
    const dispatch = useDispatch()
    const actualProduct = product.product_id
    function handleMinusClick(product_id, quantity){
        let product = {
            product_id,
            quantity
        }
        dispatch(set_product({product, minus: true, cart_id}))
    }
    function handleAddClick(product_id, quantity){
        let product = {
            product_id,
            quantity
        }
        dispatch(set_product({product, minus: false, cart_id}))
    }
    function handleRemove(product_id){
        let product = {
            product_id
        }
        dispatch(remove_product({product, cart_id}))
    }

    return(
        <div key={product.product_id._id} className="w-full h-[96px] flex flex-row justify-between p-2 border rounded-lg">
            <img src={actualProduct.photo} className="w-20 h-20 object-contain rounded-lg p-1" alt="" />
            <div className="flex flex-col justify-between items-start grow">
            <p className="text-xs text-paragraph-primary font-bold">{actualProduct.name}</p>
            <p className="text-sm text-paragraph-primary font-bold">${parsePrice(actualProduct.price)}</p>
            </div>
            <div className="flex flex-col justify-between items-end">
                <TrashIcon onClick={() => handleRemove(actualProduct._id)} className="text-error-500 h-6 w-6 hover:fill-error-100 "/>
                <div className="flex flex-row justify-center items-center text-primary-500 gap divide-x  border  rounded-lg overflow-hidden">
                    <button disabled={product.quantity === 1} onClick={() => handleMinusClick(actualProduct._id, product.quantity)} className="px-2 py-1 hover:bg-bg-medium text-paragraph-primary  w-8 text-center">-</button>
                    <p className="px-2 py-1 w-8 text-center text-paragraph-primary">{product.quantity}</p>
                    <button onClick={() => handleAddClick(actualProduct._id, product.quantity)} className="px-2 py-1 hover:bg-bg-medium w-8 text-center text-paragraph-primary">+</button>
                </div>
            </div>
            
        </div>
    )
}