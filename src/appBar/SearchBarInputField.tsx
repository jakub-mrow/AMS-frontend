import { FaSearch } from 'react-icons/fa'

const SearchBarInputField = (props: any) => {
    return (
        <div className="w-full h-10 rounded-3xl shadow-md bg-white flex items-center">
            <FaSearch className="text-black m-2 ml-4" />
            <input className="bg-transparent border-none h-full w-full text-xl ml-1 focus:outline-none text-black"
                type="text"
                placeholder="Type to search..."
                onChange={(e) => props.setSearchText(e.target.value)}/>
        </div>
    )
}

export default SearchBarInputField