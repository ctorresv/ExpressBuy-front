import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
/* import actions from '../../store/users/actionsUser' */

/* const { signup } = actions */

export default function Signup () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const email = useRef()
  const name = useRef()
  const lastName = useRef()
  const password = useRef()
  const photo = useRef()

  function handleForm (e) {
    e.preventDefault()
    const data = {
      email: email.current.value,
      name: name.current.value,
      last_name: lastName.current.value,
      password: password.current.value,
      photo: photo.current.value
    }

    /* dispatch(signup(data)) */
    // falta ubicar las alertas con toast
    navigate('/Login')
  }

  return (
    <>
      <div className='flex justify-center'>
        <form onSubmit={(e) => handleForm(e)} className='w-1/2 h-full text-gray-800 flex flex-col gap-2'>
          <label htmlFor=''>Email</label>
          <input className='border border-black px-4 py-2 rounded-md' type='email' placeholder='exemple@exemple.com' ref={email} />
          <label htmlFor=''>Name</label>
          <input className='border border-black px-4 py-2 rounded-md' type='text' placeholder='Your name' ref={name} />
          <label htmlFor=''>Last name</label>
          <input className='border border-black px-4 py-2 rounded-md' type='text' placeholder='Last name' ref={lastName} />
          <label htmlFor=''>Password</label>
          <input className='border border-black px-4 py-2 rounded-md' type='password' placeholder='Password' ref={password} />
          <label htmlFor=''>Photo</label>
          <input className='border border-black px-4 py-2 rounded-md' type='text' placeholder='Photo' ref={photo} />
          <input className='bg-gray-800 border border-black py-4 text-white text-center rounded-md font-semibold hover:bg-white hover:text-gray-800 cursor-pointer' type='submit' value='Sign Up' />

        </form>
      </div>
    </>
  )
}
