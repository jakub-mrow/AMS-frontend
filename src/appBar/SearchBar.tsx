import SearchBarInputField from "./SearchBarInputField";
import SearchBarResultList from "./SearchBarResultList";
import useSearchBar from "./use-search-bar";


const SearchBar = () => {
    const { searchResults, setSearchText } = useSearchBar();
    
    return (
        <div className="w-2/5 mx-auto flex flex-col items-center min-w-40 space-y-12 relative">
            <SearchBarInputField setSearchText={setSearchText} />
            {searchResults && searchResults.length > 0 && <SearchBarResultList results={searchResults} />}
        </div>
    );
}

export default SearchBar;
