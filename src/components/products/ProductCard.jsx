import { useNavigate, useParams } from 'react-router-dom'
import { parseDiscountPercentage, parseDiscountPrice, parsePrice } from '../../utils/handleData'
import { useEffect, useState } from 'react'
import { api, endpoints } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import cartActions from '../../store/user/cart/cartActions'

const { add_product, set_product, remove_product } = cartActions
export function ProductCard({ staticProduct }) {
  const { token } = useSelector(store => store.user.data)
  const itemsAdd = staticProduct
  const [items, setItems] = useState(staticProduct)
  const { cart_id, products } = useSelector(store => store.user.cart)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleAddClick(product_id, cart_id, items) {
    if (token) {
      let data_product = items
      let product_db = {
        product_id,
        quantity: 1
      }
      dispatch(add_product({ data_product, product_db, cart_id }))
    } else {
      navigate("/auth/login")
    }

  }

  function handleMinusClick(product_id, quantity) {
    let product = {
      product_id,
      quantity
    }
    dispatch(set_product({ product, minus: true, cart_id }))
  }
  function handlePlusClick(product_id, quantity) {
    let product = {
      product_id,
      quantity
    }
    dispatch(set_product({ product, minus: false, cart_id }))
  }


  useEffect(() => {
    api.get(endpoints.get_products)
      .then(res => {
        return res.data.products
      })
      .catch(err => console.log(err))
  }, [id])


  function detailsProduct() {
    navigate(`/products/details/${items._id}`, { state: items })
  }

  return (
    <div className='w-full h-[400px] bg-white flex flex-col justify-start items-center p-2 border rounded-lg m-3'>
      <img onClick={detailsProduct} src={items.photo} alt={items.name} className='h-[100px] w-1/2 object-contain' />
      <div className='w-full flex flex-col mb-6 grow mt-4'>
        <p className='w-full font-medium text-sm'>{items.name}</p>
        <p className='w-full text-paragraph-secondary text-sm mb-5'>{items?.subcategory_id?.name}</p>
        {items.discount_id?.active === true
          ? <div className='grid grid-cols-2 w-32 justify-center'>
            {items.discount_id?.active && <p className='w-fit font-medium p-1 '>${parsePrice(parseDiscountPrice(items.price, items.discount_id.percentage))}</p>}
            {items.discount_id?.active && <p className='bg-green-600 rounded-md text-center p-1 text-white'>{parseDiscountPercentage(items.discount_id.percentage)}%</p>}
            <p className='w-fit font-light p-1 mb-2 line-through'>${parsePrice(items.price)}</p>
          </div>
          : <div>
            <p className='w-fit font-semibold p-1 my-2'>${parsePrice(items.price)}</p>
            <p className='h-[1.5rem]' />
          </div>}
      </div>
      {!products?.some(product_cart => product_cart.product_id._id === items._id) ? <button onClick={() => handleAddClick(itemsAdd, cart_id, items)} className='bg-primary-500 w-full h-10 rounded-lg mb-4 font-medium text-lg text-white'>Add to cart</button>
        : <div className="flex flex-row justify-center items-center text-primary-500 gap divide-x  border  rounded-lg overflow-hidden">
          <button disabled={products.find(item => item.product_id._id === items._id).quantity === 1} onClick={() => handleMinusClick(items._id, products.find(item => item.product_id._id === items._id).quantity)} className="px-2 py-1 font-bold hover:bg-bg-medium text-paragraph-primary  w-12 text-center">-</button>
          <p className="px-2 py-1  w-12 text-center font-medium text-paragraph-primary">{products.find(item => item.product_id._id === items._id).quantity}</p>
          <button onClick={() => handlePlusClick(items._id, products.find(item => item.product_id._id === items._id).quantity)} className="px-2 py-1 hover:bg-bg-medium font-bold  w-12 text-center text-paragraph-primary">+</button>
        </div>}
    </div>
  )
}
