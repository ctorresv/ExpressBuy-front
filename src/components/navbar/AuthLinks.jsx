import { Link } from "react-router-dom"
export function AuthLinks() {
    return (
        <div className='flex flex-row items-center gap-2'>
            <Link to={"/auth/login"} className='w-24 font-medium text-white border-2 border-transparent bg-primary-600 py-2 px-2 rounded-lg hover:bg-primary-500  text-center'>Sign in</Link>
            <Link to={"/auth/register"} className='w-24 font-medium border-2 border-primary-600 text-primary-600 py-2 px-2 rounded-lg text-center'>Sign up</Link>
        </div>
    )
}