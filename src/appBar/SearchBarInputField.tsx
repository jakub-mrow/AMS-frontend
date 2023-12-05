import { FaSearch } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa';

interface SearchBarInputFieldProps {
    setSearchText: (serachText: string) => void;
}

const SearchBarInputField: React.FC<SearchBarInputFieldProps> = ({ setSearchText }) => {
    return (
        <div className="w-full h-10 rounded-lg shadow-md bg-white flex items-center">
            <FaSearch className="text-black m-2 ml-4" />
            <input className="bg-transparent border-none h-full w-full text-xl ml-1 focus:outline-none text-black"
                type="text"
                placeholder="Type to search..."
                onChange={(e) => setSearchText(e.target.value)} />
            <div onClick={() => setSearchText("")}>
                <FaTimes className="text-black m-2 mr-4 hover:bg-gray-100" />
            </div>
        </div>
    )
}

export default SearchBarInputField