
import { api, headers } from "../../utils/api"
import { LS } from "../../utils/localStorageUtils"
import { InputText } from "../../components/forms/InputText"
import { toast } from "react-hot-toast"
import { parseDataFromForm } from "../../utils/handleData"
import { useSelector } from "react-redux"



export function CreateProducts() {
  const { categories, subcategories, departments } = useSelector(store => store.menu)
  /* const {error} = useSelector(store => store.user.data) */


   async function handleSubmit(e){
    const {data} = parseDataFromForm(e)
      try {
        const res = await api.post(`products/`,data,headers(LS.get("token")))
        toast.success("Saved")
      } catch (error) {
        toast.error("Error")
      }

  }

  return (
    <>
      <div className="w-9/12 h-fit">
        <form onSubmit={handleSubmit} className="m-8 flex flex-col gap-2">
          <InputText name="name" label="Name" error="" type="text" placeholder="Insert name product" />
          <InputText name="photo" label="Photo" error="" type="text" placeholder="Insert photo here" />
          <InputText name="description" label="Description" error="" type="text" placeholder="Insert description" />
          <InputText name="price" label="Price" error="" type="text" placeholder="Insert price" />
          <InputText name="ean13" label="Ean13" error="" type="text" placeholder="Insert EAN13" />
          <InputText name="stock" label="Stock" error="" type="text" placeholder="Insert stock" />
          <select name="department_id" className='text-paragraph-primary border rounded-lg font-medium my-2 w-full h-10'>
            <option value="">Insert department</option>
            {departments?.map(departments => (
              <option key={departments._id} value={departments._id} >{departments.name}</option>))}
          </select>
          <select name="category_id" className='text-paragraph-primary border rounded-lg font-medium my-2 w-full h-10'>
            <option value="">Insert category</option>
            {categories?.map(category => (
              <option key={category._id} value={category._id} >{category.name}</option>))}
          </select>
          <select name="subcategory_id" className='text-paragraph-primary border rounded-lg font-medium my-2 w-full h-10'>
            <option value="">Insert subcategory</option>
            {subcategories?.map(subcategory => (
              <option key={subcategory._id} value={subcategory._id} >{subcategory.name}</option>))}
          </select>
          <button className="w-full h-12 rounded-lg text-white flex items-center justify-center bg-primary-700" type="submit">Create</button>
        </form>
      </div>
    </>
  )
}