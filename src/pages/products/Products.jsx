import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/products/ProductCard'
import { api, endpoints } from '../../utils/api'
import { useSearchParams } from 'react-router-dom'
import { InputText } from "../../components/forms/InputText"
import { parseDataFromForm } from '../../utils/handleData'
import { useSelector } from 'react-redux'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'


export function Products() {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const { categories, subcategories } = useSelector(store => store.menu)
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(null)
  useEffect(() => {
    api.get(endpoints.get_products + location.search).then((res) => {
      setProducts(res.data.products)
      setTotalPages(res.data.pagination.totalPages)
      console.log(res.data.pagination)
    })
      .catch(err => console.log(err))
    setCategory(searchParams.get("category_id"))
  }, [searchParams])
  function handleFilters(e) {
    e.preventDefault()
    const { data } = parseDataFromForm(e)
    data.page = 1
    setSearchParams(data);
  }
  function handleUpPage() {
    console.log(searchParams.get("page"))
    if (parseInt(searchParams.get("page")) + 1 <= totalPages) {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: parseInt(searchParams.get("page")) + 1 })
    }
    console.log("entre")
  }
  function handleDownPage() {
    console.log(parseInt(searchParams.get("page")) - 1 > 0)
    if (parseInt(searchParams.get("page")) - 1 > 0) {
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: parseInt(searchParams.get("page")) - 1 })
    }
  }
  return (
    <div>


      <div className='w-full h-full flex flex-col justify-center items-start p-4 lg:flex-row'>
        <div className='filter lg:w-1/4 w-full my-5 flex flex-col justify-start items-start rounded-lg'>
          <Disclosure >
            <Disclosure.Button className="py-2 w-full text-start rounded-lg border px-2 flex flex-row items-center gap-2">
              Filters <ChevronDownIcon className='w-4 h-4' />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 w-full">
              <form className='w-full h-full text-white' onSubmit={handleFilters}>
                <div className='my-2 flex flex-col gap-1'>
                  <label htmlFor="category_id" className='font-medium'>Categories</label>
                  <select className='border rounded-lg font-light p-2 w-full' name="category_id" value={category} onChange={(e) => setCategory(e.target.value)} defaultValue={searchParams.get("category_id")}>
                    <option value="">All</option>
                    {categories?.map((category) => {
                      return <option key={category._id} selected={category._id === searchParams.get("category_id")} value={category?._id}>{category?.name}</option>
                    })}
                  </select>
                </div>
                <div className='my-2 flex flex-col gap-1'>
                  <label htmlFor="subcategory_id" className='font-medium'>Subcategories</label>
                  <select className='border w-full font-light rounded-lg p-2' name="subcategory_id" defaultValue={searchParams.get("subcategory_id")}>
                    <option value="">All</option>
                    {subcategories?.filter(item => item.category_id === category).map((subcategory) => {
                      return <option key={subcategory._id} selected={subcategory._id === searchParams.get("subcategory_id")} value={subcategory?._id}>{subcategory?.name}</option>
                    })}
                  </select>
                </div>
                <InputText name={"name"} label={"Name"} error={null} type={"text"} placeholder={"Product name"} />
                <div className='flex flex-row justify-between items-center gap-2'>
                  <div className='w-1/2'>
                    <InputText name={"min_price"} label={"Min price"} error={null} type={"text"} placeholder={"Min price"} />
                  </div>
                  <div className='w-1/2'>
                    <InputText name={"max_price"} label={"Max price"} error={null} type={"text"} placeholder={"Max price"} />
                  </div>
                </div>


                <button className='rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium w-full p-2 my-4'>Apply filters</button>
              </form>
            </Disclosure.Panel>
          </Disclosure>
        </div>
        <div className='grow w-full grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-2 p-2 '>
          {products?.map((item) => <ProductCard staticProduct={item} key={item._id} />)}
        </div>
      </div>
      <div className='w-full flex flex-row justify-center items-center gap-6 my-4'>
        <button onClick={handleDownPage} className='bg-primary-500 text-white p-2 rounded-lg'>Prev page</button>
        <button onClick={handleUpPage} className='bg-primary-500 text-white p-2 rounded-lg'>Next page</button>
      </div>
    </div>
  )
}
