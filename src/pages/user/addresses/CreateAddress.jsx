import { useDispatch } from "react-redux"
import { parseDataFromForm } from "../../../utils/handleData"
import actions from "../../../store/user/address/addressActions"

import {InputText} from "../../../components/forms/InputText"
import { useNavigate } from "react-router-dom"
const {create} = actions
export function CreateAddress(){
    const navigate = useNavigate()
    const dispatch =  useDispatch()
    function handleSubmit(e){
        e.preventDefault()
        let {data} = parseDataFromForm(e)
        dispatch(create({data}))
        setTimeout(() => {
            navigate("/adresses/me")
        },1000)
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center p-4">
            <h1 className="text-paragraph-primary font-medium">Create Address</h1>
            <form onSubmit={handleSubmit} className="lg:w-1/2 text-center">
                <InputText name={"name"} label={"Address name"} error={null} type={"text"} />
                <InputText name={"address_line"} label={"Address line"} error={null} type={"text"} />
                <InputText name={"city"} label={"City"} error={null} type={"text"} />
                <InputText name={"state"} label={"State"} error={null} type={"text"} />
                <InputText name={"country"} label={"Country"} error={null} type={"text"} />
                <InputText name={"zip_code"} label={"Zip code"} error={null} type={"number"} />
                <InputText name={"telephone"} label={"Telephone number"} error={null} type={"number"} />
                <button className="w-1/2 bg-primary-500 text-white rounded-lg p-2 my-2">Create</button>
            </form>
        </div>
    )
}