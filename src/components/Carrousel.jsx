
/* eslint-disable no-unused-expressions */
import { useState } from 'react'

function Carrousel () {
  // useEffect(
  //     ()=>{ axios(apiUrl+'imgscrl')
  //             .then(res=> setImages(res.data.imgs))
  //             .catch(err=> console.log(err)) }, []
  // )
  // let [images, setImages] = useState([])

  const [counter, setCounter] = useState(0)
  const add = () => {
    setCounter(counter + 1)
    counter === images.length - 1 ? setCounter(0) : null
  }
  const rest = () => {
    setCounter(counter - 1)
    counter === 0 ? setCounter(images.length - 1) : null
  }

  return (
    <div className='relative mobile:hidden  lg:block col-span-2  h-[100%] w-[100%] select-none'>
      <div className='absolute flex justify-between top-[50%] lg:w-[100%] lg:px-10 2xl:px-auto'>
      </div>
      <img src={images[counter]?.img} alt='MangasImg' className='w-[80%] h-[100%] | lg:m-auto | xl:ml-auto' />

    </div>
  )
}

export default Carrousel
