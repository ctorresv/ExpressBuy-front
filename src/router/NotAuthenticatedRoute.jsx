import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { Loading } from "../pages/Loading";
import { LS } from "../utils/localStorageUtils";

export function NotAuthenticatedRoute({ children }) {
    let tokenStorage = LS.get('token');

    let {token}= useSelector(store => store.user.data)

    const [loading, setLoading] = useState(tokenStorage ? true : false)
    useEffect(() => {
        if (token) {
            setLoading(false)
        }
    }, [token])
    if (loading) {
        return <Loading />
    }
    if (token && tokenStorage) {
        return <Navigate to={"/"} replace={true} />
    }
    return children
}

//si hay token -> redirect /
//si no hay token


//login - register - verify -> no deberia podeer entrar si ya estoy logeado
//si hay token en el store -> redirect /

//cuando se llena ese token -> cuando se carga la app se dispacha sign_in_token action y rellena el token siempre y cuando no hay token en el local storage
//si no hay token en el local storage y no hay en el store -> return children