import { useDispatch, useSelector } from "react-redux"
import { parseDataFromForm } from "../../../utils/handleData"
import { InputText } from "../../../components/forms/InputText"
import { api, headers } from "../../../utils/api"
import { useLocation, useNavigate, useParams } from "react-router"
import { LS } from "../../../utils/localStorageUtils"
import { toast } from "react-hot-toast"



export function ModifyAddress() {

    const location = useLocation()
    const { address_id } = useParams()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            let { data } = parseDataFromForm(e)
            const res = await api.put(`addresses/${address_id}`, data, headers(LS.get("token")))
            toast.success("Saved")
            navigate("/adresses/me")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-full h-full flex flex-col justify-start items-center p-4">
            <h1 className="text-paragraph-primary font-medium">Modify Address</h1>
            <form onSubmit={handleSubmit} className="lg:w-1/2 text-center">
                <InputText name={"name"} defaultValue={location.state?.name} label={"Address name"} error={null} type={"text"} />
                <InputText name={"address_line"} defaultValue={location.state?.address_line} label={"Address line"} error={null} type={"text"} />
                <InputText name={"city"} defaultValue={location.state?.city} label={"City"} error={null} type={"text"} />
                <InputText name={"state"} defaultValue={location.state?.state} label={"State"} error={null} type={"text"} />
                <InputText name={"country"} defaultValue={location.state?.country} label={"Country"} error={null} type={"text"} />
                <InputText name={"zip_code"} defaultValue={location.state?.zip_code} label={"Zip code"} error={null} type={"number"} />
                <InputText name={"telephone"} defaultValue={location.state?.telephone}  label={"Telephone number"} error={null} type={"number"} />
                <button className="w-1/2 bg-primary-500 text-white rounded-lg p-2 my-2">Edit</button>

            </form>
        </div>
    )
}