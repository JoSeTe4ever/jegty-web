import TextField from '@material-ui/core/TextField';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getGamesByName } from "./../../../data/games-api";
import { useDebouncedSearch } from "./../../../hooks/useDebouncedSearch";
import { LoadingSpinner } from './../atoms/LoadingSpinner';
import { ResultsList } from "./../mollecules/ResultsList";

const useSearchGames = () => useDebouncedSearch(text => getGamesByName(text))

export const SearchInput = () => {

    const [hasText, setHasText] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedGame, setSelectedGame] = useState({});
    const { inputText, setInputText, searchResults } = useSearchGames();
    const searchGameRef = useRef(null);

    const selectGame = (game) => {
        setSelectedGame(game);
        setInputText(game.slug);
        debugger;
        //todo set the ref
    }
    // TODO hay que usar el useEffect y no olvida hacer el unsubscribe, correspondiente. 
    const handleChange = (e) => {
        setInputText(e.target.value);
        setHasText(true)
        setLoading(true);
        
        if (selectedGame) {
            setSelectedGame({});
        }

        if (e.target.value === "") {
            setLoading(false);
            setHasText(false);
        }
    }
    let searchResult = null;
    let selectedGameResult = null;

    if (searchResults && searchResults.status === "success" && searchResults.result && searchResults.result.raw) {
        searchResult = <div className="searchResultsContainer"><ResultsList onSelect={selectGame} elements={searchResults ? searchResults.result.raw() : []}></ResultsList></div>;
    } else if (searchResults && searchResults.status === "loading") {
        searchResult = (<div className="searchResultsContainer"> <LoadingSpinner></LoadingSpinner></div>)
    } else if (searchResults && selectedGame.slug) {
        searchResult = (<div className="searchResultsContainer"> {selectedGame.slug}</div>)
    }

    if (selectedGame.slug) {
        return <div className="form-group has-search searchInputContainer">
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} value={inputText} />
            {selectedGame.slug}
        </div>
    }

    return (
        <div className="form-group has-search searchInputContainer">
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            {searchResult}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
