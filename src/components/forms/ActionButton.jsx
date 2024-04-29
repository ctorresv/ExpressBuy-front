export function ActionButton({ loading, children }) {
    return (
        <button className={`w-full text-white min-h-[42px] my-2 font-medium bg-primary-600 hover:bg-primary-500 p-2 rounded-lg text-center flex flex-row items-center justify-center`}>
            <p className="text-sm">
                {loading ? <Spinner /> : children}
            </p>

        </button>
    )
}

function Spinner() {
    return (
        <svg
            className="ring-spinner text-sm"
            viewBox="25 25 50 50"
            strokeWidth="5"
        >
            <circle cx="50" cy="50" r="20" />
        </svg>

    )
}