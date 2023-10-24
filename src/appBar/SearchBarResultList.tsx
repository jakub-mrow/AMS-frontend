import SearchBarResultItem from "./SearchBarResultItem.tsx";
import { Result } from "./use-search-bar.ts"

interface SearchBarResultListProps {
    results: Result[];
  }

const SearchBarResultList: React.FC<SearchBarResultListProps> = ({ results }) => {
    return (
        <div className="w-2/5 border p-2 border-gray-200 shadow-xl bg-white rounded-lg fixed flex-col space-y-2 overflow-y-auto max-h-72">
            {results.map( (searchResult) => (
                <SearchBarResultItem result={searchResult}/>
            ))}
        </div>
    )
}

export default SearchBarResultList