export function ErrorMessage({error}){
    return(
        <div className="w-full rounded-lg bg-error-100 p-2 text-error-500 flex flex-row justify-center items-center my-4">
            {error}
        </div>  
    )
}