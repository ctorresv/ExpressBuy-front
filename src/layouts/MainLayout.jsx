import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
/* import { Navbar } from '../components/navbar-test/Navbar' */


export default function Main({ children }) {
  return (
    <>
      <div className='w-full h-screen flex flex-col'>
        <header className='px-4 lg:px-12 shadow-sm'>
          <Navbar />
        </header>
        <main className='grow'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
