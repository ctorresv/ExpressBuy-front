import { ProductsCards } from "../components/products/ProductsCards"
import { CardSales } from "../components/home/CardSales/CardSales"
import hero from "../components/products/ImagenesProducts/diadelpadre.webp"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export function Home(items, card) {
  const navigate = useNavigate()
  const { user } = useSelector(store => store.user.data)
  useEffect(() => {
    if (user?.role > 0) {
      navigate("/admin/")
    }
  }, [user])
  return (
    <>
      <div className="bg-bg-light flex h-full flex-col justify-center items-center">
        <div className="w-11/12 h-96 min-h-[220px] flex items-center justify-center my-6 ">
          <img src={hero} alt="" className="w-full h-full" />
        </div>
        <CardSales />
        <div className="w-11/12 my-6">
          <p className="font-bold text-paragraph-primary my-4 text-2xl">Featured products</p>
          <div onClick={() => navigate("/products")}>
            <ProductsCards />
          </div>

        </div>
      </div>
    </>

  )
}
