import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

export const CreateGame = () => {

    // jopi meter esto en otro componente. al menos el datepicker.
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <div className="p-5">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </div>

                <div>
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
                </div>

                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />

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
