import React, { useState } from 'react'
import { connect } from 'react-redux'
import { LoadingSpinner } from './../atoms/LoadingSpinner'
import { ResultsList } from "./../mollecules/ResultsList"
import { getGamesByName } from "./../../../data/games-api";
export const SearchInput = () => {

    const [text, setText] = useState("");
    const [hasText, setHasText] = useState(false);
    const [isLoading, setLoading] = useState(false);


    // TODO hay que usar el useEffect y no olvida hacer el unsubscribe, correspondiente. 
    const handleChange = (e) => {
        setText(e.target.value);
        setHasText(true)
        setLoading(true);

        if (e.target.value === "") {
            setLoading(false);
            setHasText(false);
        }
    }
    let searchResult = null;
    if (hasText) {
        searchResult = (<div className="searchResultsContainer"> {isLoading ? <LoadingSpinner></LoadingSpinner> : <ResultsList></ResultsList>}</div>)
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
