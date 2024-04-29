import { useEffect, useState } from 'react'
import { api, endpoints } from '../../utils/api'
import { AdminProducts } from '../../components/products/AdminProducts'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export function ProductsAdmin() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    console.log("entre")
    api.get(endpoints.get_products + location.search + "&all=true")
      .then((res) => {
        setProducts(res.data.products)
        setTotalPages(res.data.pagination.totalPages)
      })
      .catch(err => console.log(err))
      console.log(products)
  }, [searchParams])

  function createProduct() {
    navigate("/admin/products/create")
  }
  function handleUpPage() {
    console.log(searchParams.get("page"))
    if (parseInt(searchParams.get("page")) + 1 <= totalPages) {
      setSearchParams({ page: parseInt(searchParams.get("page")) + 1 })
    }
    console.log("entre")
  }
  function handleDownPage() {
    console.log(parseInt(searchParams.get("page")) - 1 > 0)
    if (parseInt(searchParams.get("page")) - 1 > 0) {
      console.log("entre")
      setSearchParams({ page: parseInt(searchParams.get("page")) - 1 })
    }
  }
  return (
    <div className='w-full flex flex-col  justify-center gap-4 p-4 mb-24'>
      <button onClick={createProduct} className='w-full bg-primary-700 rounded-lg text-white h-10 '>Create new product</button>      
      {products?.map((item) => <AdminProducts staticItems={item} key={item._id} />)}
      <div className='w-full flex flex-row justify-center items-center gap-6 my-4'>
        <button onClick={handleDownPage} className='bg-primary-500 text-white p-2 rounded-lg'>Prev page</button>
        <button onClick={handleUpPage} className='bg-primary-500 text-white p-2 rounded-lg'>Next page</button>
      </div>
    </div>
  )
}
