import React from 'react'
import { Result } from "./use-search-bar.ts"
import { useNavigate } from 'react-router-dom';

interface SearchBarResultItemProps {
    result: Result
}

const SearchBarResultItem: React.FC<SearchBarResultItemProps> = ({ result }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/assets/${result.Code}.${result.Exchange}`)
    }

    return (
        <div className="flex flex-col p-2 rounded-lg m-2 hover:bg-blue-100 transition duration-300 ease-in-out"
            onClick={() => handleClick()}
        >
            <span className="text-black">{result.Name} ({result.Currency})</span>
            <div className="flex flex-row space-x-2">
                <span className="text-black">
                    {result.Code}
                </span>
                <span className="text-black">
                    {result.Exchange}
                </span>
            </div>
            <div className="w-full h-0.5 bg-gray-300"></div>

        </div>
    )
}

export default SearchBarResultItem