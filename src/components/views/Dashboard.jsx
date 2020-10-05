import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import GuardedRoute from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';
import { Navbar } from "../../components/shared/mollecules/Navbar"
import { Profile } from "../../components/views/dashboard/Profile"

export const Dashboard = () => {
    const user = null;
    const LoggedRoute = GuardedRoute(true); // this shuold be the user logged in

    // remove backdrop from modal if exists.
    useEffect(() => {
        const modalBackgroundArray = document.getElementsByClassName("modal-backdrop fade show")
        if (modalBackgroundArray && modalBackgroundArray.length > 0) {
            modalBackgroundArray[0].remove();
        }
    }, [])


    return (
        <React.Fragment>
            <Navbar></Navbar>
            <Switch>
                <LoggedRoute exact path="/" component={Home} />
                <LoggedRoute exact path="/profile" component={Profile} />
                <LoggedRoute path="*">
                    <NotFound></NotFound>
                </LoggedRoute>
            </Switch>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
