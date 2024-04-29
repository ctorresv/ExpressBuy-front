import { useSelector } from 'react-redux'
import {Bars3Icon} from '@heroicons/react/24/solid'
import { SearchBar } from './navbar/SearchBar'
import { PopoverButton } from './navbar/SubcategoriesMenu'
import { Avatar } from './navbar/Avatar'
import { AuthLinks } from './navbar/AuthLinks'
import { Cart } from './navbar/Cart'
import { Slideover } from './navbar/Slideover'
import { SlideoverMenu } from './navbar/SlideoverMenu'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, token } = useSelector(store => store.user.data)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { categories, subcategories } = useSelector(store => store.menu)
  useEffect(() => {
    setOpen(false)
  },[location])
  const navigate = useNavigate()


  return (
    <>
      <nav className='w-full h-[70px] flex flex-row items-center justify-between border-b text-paragraph-primary'>
        <button onClick={() => setOpen(!open)} className='lg:hidden'>
          <Bars3Icon className='w-8 h-8'/>
        </button>
        <SlideoverMenu open={open} setOpen={setOpen}/>
        <h1 onClick={()=>navigate("/")} className='font-black text-primary-600 text-3xl hidden lg:block'>ExpressBuy</h1>
        {!token && <AuthLinks />}
        {token &&
          <div className='flex flew-row  divide-x-2 items-center'>
            <div className='grow px-4'>
              <Avatar />
            </div>
            <div className='grow px-4 relative'>
              <Cart />
            </div>
          </div>
        }
      </nav>
      <nav  className='hidden border-y w-full lg:flex lg:flex-row justify-start items-center gap-4 my-2 flex-wrap'>
        {categories?.filter((item) => item.active).map((item) => <PopoverButton key={item._id} category={item} subcategories={subcategories?.filter(itemsub => itemsub.category_id === item._id && itemsub.active)} />)}
      </nav>
    </>
  )
}

export default Navbar
