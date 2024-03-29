import React from 'react'
import { Result } from "./use-search-bar.ts"
import { useNavigate } from 'react-router-dom';

interface SearchBarResultItemProps {
    result: Result
    setSearchText: (text: string) => void;
}

const SearchBarResultItem: React.FC<SearchBarResultItemProps> = ({ result, setSearchText }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        setSearchText("");
        navigate(`/assets/${result.Code}.${result.Exchange}`)
    }

    return (
        <div className="flex p-2 rounded-lg m-2 hover:bg-blue-100 transition duration-300 ease-in-out"
            onClick={() => handleClick()}
        >
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-row justify-between">
                    <div className="flex flex-col">
                        <span className="text-black">{result.Name} ({result.Currency})</span>
                        <div className="flex flex-row space-x-2">
                            {result.ISIN && (
                                <span className="text-black text-sm">
                                    {result.ISIN}
                                </span>
                            )}
                            <span className="text-black text-sm">
                                {result.Code} |
                            </span>
                            <span className="text-black text-sm">
                                {result.Exchange}
                            </span>
                        </div>
                    </div>
                    <span className="flex flex-row items-baseline space-x-1">
                        <span className="text-black font-bold text-xl">{result.previousClose}</span>
                        <span className="text-black text-sm">{result.Currency}</span>
                    </span>
                </div>
                <div className="w-full h-0.5 bg-gray-300"></div>
            </div>
        </div>
    )
}

export default SearchBarResultItem