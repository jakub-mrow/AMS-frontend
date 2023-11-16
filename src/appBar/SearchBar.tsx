import { Alert, Snackbar } from "@mui/material";
import SearchBarInputField from "./SearchBarInputField";
import SearchBarResultList from "./SearchBarResultList";
import useSearchBar from "./use-search-bar";


const SearchBar = () => {
    const { searchResults, setSearchText, showAlert, alertSeverity, updateAlertText } = useSearchBar();

    return (
        <>
            <div className="w-2/5 mx-auto flex flex-col items-center min-w-40 space-y-12 relative">
                <SearchBarInputField setSearchText={setSearchText} />
                {searchResults && searchResults.length > 0 && <SearchBarResultList results={searchResults} setSearchText={setSearchText} />}
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                key={'bottom' + 'right'}
                open={showAlert !== null}
                autoHideDuration={5000}
                onClose={() => updateAlertText(null)}>
                <Alert severity={alertSeverity}>{showAlert}</Alert>
            </Snackbar>
        </>
    );
}

export default SearchBar;
