import React from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import { GuardedRoute } from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';

export const Dashboard = () => {
    return (
        <Switch>
            <GuardedRoute exact path="/" component={Home} />
            <GuardedRoute path="*">
                <NotFound></NotFound>
            </GuardedRoute>
        </Switch>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
