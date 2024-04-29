import { useDispatch } from "react-redux"
import actions from "../../store/user/auth/authActions"


const {test, testAsync} = actions
export function Verify() {
    const dispatch = useDispatch()
    function handleClick(){
        dispatch(test())
    }
    function handleClickAsync(){
        dispatch(testAsync())
    }
    return (
        <>
        <button onClick={handleClick}>Click me - to see</button>
        <button onClick={handleClickAsync}>Click me async - to see</button>
        </>
        
    )
}