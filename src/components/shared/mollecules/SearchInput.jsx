import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { getRawGamesByName } from "./../../../data/games-api";
import { useDebouncedSearch } from "./../../../hooks/useDebouncedSearch";
import { LoadingSpinner } from './../atoms/LoadingSpinner';
import { ResultsList } from "./../mollecules/ResultsList";

const useSearchGames = () => useDebouncedSearch(text => getRawGamesByName(text))

export const SearchInput = (props) => {

    const {innerRef} = props;
    const [selectedGame, setSelectedGame] = useState({});
    const { inputText, setInputText, searchResults } = useSearchGames();

    const selectGame = (game) => {
        setSelectedGame(game);
        setInputText(game.name);
        innerRef.current = game;
    }
    // TODO hay que usar el useEffect y no olvida hacer el unsubscribe, correspondiente. 
    const handleChange = (e) => {
        setInputText(e.target.value);

        if (selectedGame) {
            setSelectedGame({});
        }
    }
    let searchResultJSX = null;
    let selectedGameResult = null;

    if (searchResults && searchResults.status === "success" && searchResults.result && Array.isArray(searchResults.result.results)) {
        searchResultJSX = <div className="searchResultsContainer"><ResultsList onSelect={selectGame} elements={searchResults ? searchResults.result.results : []}></ResultsList></div>;
    } else if (searchResults && searchResults.status === "loading") {
        searchResultJSX = (<div className="searchResultsContainer"> <LoadingSpinner></LoadingSpinner></div>)
    }

    if (selectedGame.slug) {
        selectedGameResult = (<div className="selectedGameResultContainer"> {selectedGame.slug}</div>)
    }

    if (selectedGame.slug) {
        return <div className="searchInputContainer">
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} value={inputText} />
            <img className="mr-3 img-thumbnail game-img-thumbnail" src={selectedGame.background_image} alt={selectedGame.slug}></img>
            <div className="media-body">
                <h5 className="mt-0 mb-1">{selectedGame.slug}</h5>
            </div>
        </div>
    }

    return (
        <div className="form-group has-search searchInputContainer">
            <TextField id="outlined-basic" label="Search" variant="outlined" onChange={handleChange} />
            {searchResultJSX}
        </div>
    )
}