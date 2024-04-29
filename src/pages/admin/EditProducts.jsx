
import { useEffect, useState } from 'react'
import { api, apiUrl, headers } from '../../utils/api'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { InputText } from '../../components/forms/InputText'
import { useSelector } from 'react-redux'
import { parseDataFromForm } from '../../utils/handleData'
import { LS } from '../../utils/localStorageUtils'
import { toast } from 'react-hot-toast'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'


export function EditsProduct() {

  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { categories, subcategories } = useSelector(store => store.menu)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(apiUrl + `products/${id}`)
      .then(res => {
        const productData = res.data.product
        setProduct(productData)
      })
      .catch(err => console.log(err))
  }, [id])


  async function handleSubmit(e){
    const {data} = parseDataFromForm(e)
      try {
        const res = await  api.put(`products/${id}`,data,headers(LS.get("token")))
        toast.success("Saved")
      } catch (error) {
        toast.error("Error")
      }
  }

  return (

    <div className='w-full h-screen bg-white '>

      <button onClick={() => navigate(-1)} className="bg-primary-700 text-white p-1 rounded-lg flex flex-row w-[120px] items-center"> <ChevronLeftIcon className="w-6 h-6 stroke-white fill-white" />Go back</button>


      <div className='mt-7 flex flex-col lg:flex lg:flex-row lg:justify-around w-full'>

        {product && (
          <><img src={product.photo} alt='' className='lg:h-1/2 h-2/5 object-contain' /><div className='bg-white lg:w-1/2 w-full lg:flex lg:justify-start lg:items-start flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col lg:gap-8 w-11/12'>
              <InputText name="name" defaultValue={product.name ? product.name : ""} label="Rename" error='' type='' />
              <InputText name="description" defaultValue={product.description ? product.description : ""} label='Change description' error='' type='text' />
              <InputText name="price" defaultValue={product.price ? product.price : ""} label="Price" error='' type='text' placeholder='Change price' />
              <select name="category_id" defaultValue={product.category_id} className='text-paragraph-primary border rounded-lg font-medium my-2 w-full h-10'>
                {categories?.map(category => (
                  <option key={category._id} value={category._id} >{category.name}</option>
                ))}
              </select>
              <select name="subcategory_id" defaultValue={product.subcategory_id} className='text-paragraph-primary border rounded-lg font-medium my-2 w-full h-10'>
                {subcategories?.map(subcategory => (
                  <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                ))}
              </select>
              <button className='bg-primary-700 h-12 rounded-lg text-white'>Save</button>
            </form>
          </div></>
        )}
      </div>
    </div>
  )
}
