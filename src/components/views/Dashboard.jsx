import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from "react-router-dom";
import { Navbar } from "../../components/shared/mollecules/Navbar";
import { Friends } from "../../components/views/dashboard/Friends";
import { Profile } from "../../components/views/dashboard/Profile";
import GuardedRoute from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';
import { NavigationMenu } from './../../components/shared/mollecules/NavigationMenu';

export const Dashboard = () => {
    const LoggedRoute = GuardedRoute(true); // this shuold be the user logged in

    const navitagionElemens = [{ icon: 'gamepad', navLocation: '/games', navText: 'Games' },
    { icon: 'users', navLocation: '/friends', navText: 'Friends' },
    { icon: 'futbol-o', navLocation: '/tournaments', navText: 'Tournaments' },
    { icon: 'user', navLocation: '/profile', navText: 'Profile' }];

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
            <section>

                <div>
                    <div className="row">
                        <div className="col-3 fixedMenu">
                            <NavigationMenu elems={navitagionElemens}></NavigationMenu>
                        </div>
                        <div className="col-6 infiniteScroll">
                            <Switch>
                                <LoggedRoute exact path="/" component={Home} />
                                <LoggedRoute exact path="/profile" component={Profile} />
                                <LoggedRoute exact path="/friends" component={Friends} />
                                <LoggedRoute path="*">
                                    <NotFound></NotFound>
                                </LoggedRoute>
                            </Switch>
                        </div>
                        <div className="col-3 friendsList">
                            jopi
                        </div>
                    </div>
                </div>


                <footer>
                </footer>
            </section>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
