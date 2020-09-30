import React from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import  GuardedRoute  from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';

export const Dashboard = () => {
    const user = null;
    const LoggedRoute = GuardedRoute(true); // this shuold be the user logged in

    return (
        <Switch>
            <LoggedRoute exact path="/" component={Home} />
            <LoggedRoute path="*">
                <NotFound></NotFound>
            </LoggedRoute>
        </Switch>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
