import { useNavigate } from "react-router-dom"


export function HomeAdmin() {
  const navigate = useNavigate()
  function handleProducts() {
    navigate("/admin/products")
  }
  function handleOrders() {
    navigate("/admin/orders")
  }
  return (
    <div className="flex flex-col h-screen w-full bg-bg-medium">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div className="font-black text-xl lg:text-3xl">Welcome to admin dashboard</div>
        <div className="bg-primary-600 w-56 h-10 lg:h-12 lg:text-3xl lg:font-black font-bold text-white flex items-center justify-center rounded-md m-4">ExpressBuy</div>
        <p className="font-semibold mt-8 lg:text-lg text-sm flex items-center">Here you can review products and orders. It also modifies their states and edits products.</p>
        <p className="text-primary-700 font-black text-3xl flex justify-center w-full mt-2">ExBy</p>
      </div>
      <div className="w-full flex flex-row justify-center">
        <button onClick={handleProducts} className="bg-primary-600 w-44 h-12 font-semibold text-white rounded-lg mx-2">Products</button>
        <button onClick={handleOrders} className="bg-primary-600 w-44 h-12 font-semibold text-white rounded-lg mx-2">Orders details</button>
      </div>
    </div>
  )
}