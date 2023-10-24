import { Result } from "./use-search-bar.ts"

interface SearchBarResultListProps {
    results: Result[];
  }

const SearchBarResultList: React.FC<SearchBarResultListProps> = ({ results }) => {
    return (
        <div className="w-2/5 border p-2 border-gray-200 shadow-xl bg-white rounded-lg fixed flex-col space-y-2 overflow-y-auto max-h-72">
            {results.map( (result) => (
                <div className="flex flex-col p-2 rounded-lg m-2 hover:bg-blue-100 transition duration-300 ease-in-out">
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
            ))}
        </div>
    )
}

export default SearchBarResultList