import React, { useState } from 'react';
import { connect } from 'react-redux';
import { LoadingSpinner } from './../atoms/LoadingSpinner';
import { ResultsList } from "./../mollecules/ResultsList";
import { getGamesByName } from "./../../../data/games-api";
import { useDebouncedSearch } from "./../../../hooks/useDebouncedSearch"

const useSearchGames = () => useDebouncedSearch(text => getGamesByName(text))

export const SearchInput = () => {

    const [hasText, setHasText] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const { inputText, setInputText, searchResults } = useSearchGames();

    // TODO hay que usar el useEffect y no olvida hacer el unsubscribe, correspondiente. 
    const handleChange = (e) => {
        setInputText(e.target.value);
        setHasText(true)
        setLoading(true);

        if (e.target.value === "") {
            setLoading(false);
            setHasText(false);
        }
    }
    let searchResult = null;

    if(searchResults && searchResults.status === "success" && searchResults.result && searchResults.result.raw){
        searchResult = <div className="searchResultsContainer"><ResultsList elements={searchResults ? searchResults.result.raw() : []}></ResultsList></div>;
    } else if (searchResults && searchResults.status === "loading") {
        searchResult = (<div className="searchResultsContainer"> <LoadingSpinner></LoadingSpinner></div>)
    }

    return (
        <div className="form-group has-search searchInputContainer">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" onChange={handleChange}></input>
            {searchResult}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
