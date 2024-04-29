import { useEffect, useState } from 'react'
import { apiUrl } from '../../utils/api'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { parseDiscountPercentage, parseDiscountPrice, parsePrice } from '../../utils/handleData'

export function ProductDetails() {

  const { product_id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(apiUrl + `products/${product_id}`)
      .then(res => {
        const productData = res.data.product
        setProduct(productData)
      })
      .catch(err => console.log(err))
  }, [product_id])

  return (
    <div className='h-full bg-black w-full flex'>
      {product && (
        <>
          <div className='bg-white w-1/2'>
            <img src={product.photo} className='w-full h-1/2 object-contain' alt="" />
          </div>
          <div className='bg-white w-1/2  '>
            <div className='mx-10 mt-3 flex flex-col'>
              <p className='font-medium text-2xl'>{product.name}</p>
              <p className='text-sm'>SKU:{product.ean13}</p>
              <p className='my-5'>{product.description}</p>
              {product.discount_id?.active === true
                ? <div className='grid grid-cols-2 w-32 justify-center'>
                  {product.discount_id.active && <p className='w-fit font-medium p-1 '>${parsePrice(parseDiscountPrice(product.price, product.discount_id.percentage))}</p>}
                  {product.discount_id.active && <p className='bg-green-600 rounded-md text-center p-1 text-white'>{parseDiscountPercentage(product.discount_id.percentage)}%</p>}
                  <p className='w-fit font-light p-1 mb-2 line-through'>${parsePrice(product.price)}</p>
                </div>
                : <div>
                  <p className='w-fit font-semibold p-1 my-2'>${parsePrice(product.price)}</p>
                  <p className='h-[1.5rem]' />
                </div>}
            </div>
          </div>
        </>)}

    </div>
  )
}
