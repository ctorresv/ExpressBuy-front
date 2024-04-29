import { useSelector, useDispatch } from "react-redux";
import { InputText } from "../../components/forms/InputText";
import { parseDataFromForm } from "../../utils/handleData";
import { ActionButton } from "../../components/forms/ActionButton";
import authActions from '../../store/user/auth/authActions'
import { ErrorMessage } from "../../components/forms/ErrorMessage";
import { Link } from "react-router-dom";


const { sign_in } = authActions

export function SignIn() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(store => store.user.data)
  function handleSubmit(e) {
    let { data } = parseDataFromForm(e);
    dispatch(sign_in({ data }))
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-bg-light">
      <div className="w-11/12 lg:w-1/2 flex flex-col justify-center items-center gap-6">
        <h1 className='font-black text-primary-600 text-3xl'>ExpressBuy</h1>
        <h1 className="text-paragraph-primary font-bold text-2xl">Sign in to your account</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-3">
          <InputText name="email" label="Email address" error={error?.sign_in?.email} type={"email"} />
          <InputText name="password" label="Password" error={error?.sign_in?.password} type={"password"} />
          {error?.sign_in?.credential && <ErrorMessage error={error?.sign_in?.credential} />}
          <ActionButton loading={loading.sign_in}>
            <span className="text-white font-medium">Sign in</span>
          </ActionButton>
          <Link to={"/auth/register"}>Do you haven't an account yet? Please  <span className="text-primary-600 underline">Sign up</span></Link>
          <Link to={"/"}>Go to  <span className="text-primary-600 underline">Home</span></Link>
        </form>
      </div>
    </div>
  )
}