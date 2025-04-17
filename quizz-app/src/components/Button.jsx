
export default function Button({ title, handleClick, wFull }) {
    return(        
    <button
    className={`${wFull ? "w-full" : ""} p-3 mt-4 mx-auto bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-all duration-300`}
    onClick = {handleClick}
    >
        {title}
    </button>
    )
}