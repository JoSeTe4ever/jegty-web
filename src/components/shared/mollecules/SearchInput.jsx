import TextField from '@material-ui/core/TextField';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getRawGamesByName } from "./../../../data/games-api";
import { useDebouncedSearch } from "./../../../hooks/useDebouncedSearch";
import { LoadingSpinner } from './../atoms/LoadingSpinner';
import { ResultsList } from "./../mollecules/ResultsList";

const useSearchGames = () => useDebouncedSearch(text => getRawGamesByName(text))

export const SearchInput = (props) => {

    const {innerRef} = props;
    const [hasText, setHasText] = useState(false);
    const [isLoading, setLoading] = useState(false);
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
            {searchResult}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
