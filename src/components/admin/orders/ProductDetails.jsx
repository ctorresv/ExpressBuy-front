import { parsePrice } from "../../../utils/handleData"



export function ProductDetail({ product }) {
    return (
        <>
            
            <div className="w-full border-b py-2 grid grid-cols-5 gap-2 text-paragraph-secondary">
                <div className=" col-span-3 text-sm">
                    {product?.product_id?.name}
                </div>
                <div className=" text-sm">
                    {product?.quantity}
                </div>
                <div className=" text-sm">
                    ${parsePrice(product.quantity * product.product_id.price)}
                </div>
                
            </div>
        </>

    )
}