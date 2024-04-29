import { InputText } from "../../components/forms/InputText";
import { ActionButton } from "../../components/forms/ActionButton";
import authActions from "../../store/user/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { parseDataFromForm } from "../../utils/handleData";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { ErrorMessage } from "../../components/forms/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const { sign_up } = authActions

export function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector(store => store.user.data)

  useEffect(() => {
    if (success?.sign_up) {
      toast.success("User successfully created")
      setTimeout(() => {
        navigate("/auth/login")
      }, 1000);
    }
  }, [success])

  function handleSubmit(e) {
    const { data } = parseDataFromForm(e)
    dispatch(sign_up({ data }))
  }
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-bg-light'>
      <div className="w-11/12 lg:w-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className='font-black text-primary-600 text-3xl'>ExBy</h1>
        <h1 className="text-paragraph-primary font-bold text-2xl">Create your account</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-3">
          <InputText name="name" label="Name" error={error?.sign_up?.name} type="text" />
          <InputText name="last_name" label="Last Name" error={error?.sign_up?.last_name} type="text" />
          <InputText name="photo" label="Photo" error={error?.sign_up?.photo} type="text" />
          <InputText name="email" label="Email" error={error?.sign_up?.email} type="email" />
          <InputText name="password" label="Password" error={error?.sign_up?.password} type="password" />
          {error?.sign_up?.exist && <ErrorMessage error={error?.sign_up?.exist} />}
          <ActionButton loading={loading?.sign_up}>
            <span className="text-white font-medium">Sign up</span>
          </ActionButton>
        </form>
        <Link to={"/auth/login"}>Do you have an account? Please  <span className="text-primary-600 underline">Sign in</span></Link>
        <Link to={"/"}>Go to  <span className="text-primary-600 underline">Home</span></Link>
      </div>
    </div>
  )
}