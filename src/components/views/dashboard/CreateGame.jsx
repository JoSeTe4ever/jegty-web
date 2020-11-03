import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AvatarList } from './../../shared/mollecules/AvatarList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { SearchInput } from '../../shared/mollecules/SearchInput'
export const CreateGame = () => {

    // jopi meter esto en otro componente. al menos el datepicker.
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [partyFriends, setPartyFriends] = useState([]);

    const SEARCH_FRIENDS_INPUT_ID = "searchFriends";

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const createGame = () =>{

    };

    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <TextField id="outlined-basic" label="Name" variant="outlined" />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <SearchInput></SearchInput>
                <TextField id="outlined-basic" label="Description" variant="outlined" />
                <TextField id="outlined-basic" label="DiscordLink" variant="outlined" />

                <div className="friendsAgregator mt-3 border">
                    <Fab color="primary" aria-label="add" className="m-1">
                        <AddIcon />
                    </Fab>
                    <TextField id={SEARCH_FRIENDS_INPUT_ID} label="Search" variant="outlined" className="m-1"></TextField>
                    <AvatarList friends={partyFriends}></AvatarList>
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <button
                    data-toggle="modal" data-target="#myModal"
                    onClick={() => console.log(true)}
                    className="btn btn-custom btn-lg mt-5"
                >
                    Create
                      </button>
            </div>
        </React.Fragment>
    )
}

CreateGame.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
