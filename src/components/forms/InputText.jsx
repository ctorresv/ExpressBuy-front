

export function InputText({ name, label, error, type, placeholder,defaultValue="" }) {
    return (
        <>
            <div className="w-full flex flex-col justify-start items-start">
                <label htmlFor={name} className="text-paragraph-primary font-medium my-2">{label}</label>
                <input type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} className={`form-input bg-transparent w-full border-bg-dark rounded-lg text-paragraph-primary ${error && "border-error-500 border-2"}`} />
                {error && <p className="text-error-500">{error}</p>}
            </div>

        </>
    )
}