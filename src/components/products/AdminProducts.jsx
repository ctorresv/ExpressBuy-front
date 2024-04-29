import { useEffect, useState } from 'react'
import { api, apiUrl, endpoints, headers } from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import {LS} from "../../utils/localStorageUtils"
import { parsePrice } from '../../utils/handleData'


export function AdminProducts ({ staticItems }) {
  const navigate = useNavigate()
  const [items,setItems] = useState(staticItems)
  const { id } = useParams()


  useEffect(() => {
    api.get(endpoints.get_products)
    .then(res => {
      return res.data.products
    })
      .catch(err => console.log(err))
  }, [id])

  function setActive(){
    setItems((state)=>{
      return {
        ...state,active:!state.active
      }
    })
  }

  function editId() {
    navigate(`/admin/products/${items._id}`,{state: items})
  }
 
  function handleActive(){
    api.put(`/products/active/${items._id}`,null,headers(LS.get("token"))).then(res=> setActive()).catch(error => console.log(error))
  }

  return (

    <div className='w-full h-[120px] bg-white flex flex-row items-center border rounded-lg'>
      <img src={items.photo} alt={items.name} className='h-[100px] w-1/2 object-contain' />
      <div className='w-full flex flex-col grow'>
        <p className='w-full font-medium text-sm'>{items.name}</p>
        <p className='w-full text-paragraph-secondary text-sm'>{items?.subcategory_id?.name}</p>
        <p className='w-fit font-semibold'>${parsePrice(items.price)}</p>
      </div>
      <div className='flex flex-col w-3/12 mx-2 gap-2'>
        <button onClick={editId} className='bg-primary-700 h-8 w-20 rounded-lg font-medium text-lg text-white'>Edit</button>
        <div onClick={handleActive} className='flex w-20 bg-bg-medium rounded-full'>
          {items.active
            ? <div className='h-8 w-8 ml-12  bg-green-500 rounded-full' ></div>
            : <div className='h-8 w-8 bg-gray-500  rounded-full' ></div>}
        </div>
      </div>
    </div>
 
  )
}

