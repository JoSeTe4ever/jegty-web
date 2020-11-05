import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Switch, useLocation, useHistory } from "react-router-dom";
import { ReactComponent as IconSvg } from '../../assets/icons/icono.svg';
import { Friends } from "../../components/views/dashboard/Friends";
import { Profile } from "../../components/views/dashboard/Profile";
import { Tournaments } from "../../components/views/dashboard/Tournaments";
import { Games } from "../../components/views/dashboard/Games";
import { CreateGame } from "../../components/views/dashboard/CreateGame";
import GuardedRoute from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';
import { NavigationMenu } from './../../components/shared/mollecules/NavigationMenu';
import { db } from "./../../data/firebase";
import { addJegtyUser, addGameidToUserList } from "./../../redux/actions/actions";
import { AvatarBadge } from '../shared/mollecules/AvatarBadge';
import { getGamesByJegtyUserId } from "../../data/jegty-api";

export const Dashboard = () => {
    const LoggedRoute = GuardedRoute(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const jegtyUser = useSelector((state) => state.jegtyUser);
    const location = useLocation();
    const history = useHistory();
    const [currentLocation, setCurrentLocation] = useState(location.pathname);

    const navitagionElemens = [{ icon: 'gamepad', navLocation: '/games', navText: 'Games' },
    { icon: 'users', navLocation: '/', navText: 'Friends' },
    { icon: 'futbol-o', navLocation: '/tournaments', navText: 'Tournaments' },
    { icon: 'user', navLocation: '/profile', navText: 'Profile' }];

    // remove backdrop from modal if exists.
    useEffect(() => {
        const modalBackgroundArray = document.getElementsByClassName("modal-backdrop fade show")
        if (modalBackgroundArray && modalBackgroundArray.length > 0) {
            modalBackgroundArray[0].remove();
        }
        if (user !== undefined && user.uid !== undefined) {
            getGamesByJegtyUserId(user.uid).then(gamesList => {
                gamesList = gamesList.docs.map(doc => {
                    dispatch(addGameidToUserList(doc.data().id));
                });
            })
        }
        if (jegtyUser.id === undefined) {
            db.collection('users').doc(user.uid).get().then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                console.log(`ERROR ${error}`, "ERROR");
            });
        }
    }, [])

    useEffect(() => {
        const { pathname } = location;
        setCurrentLocation(pathname);
    }, [location]);

    const transformCurrentLocation = () => {
        if (location.pathname === "/") {
            return "Friends";
        }
        const name = location.pathname.replace(/\//g, '');
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
    return (
        <React.Fragment>
            <section>
                <div>
                    <div className="row h-100">
                        <div className="col-3 fixedMenu">
                            <div className="brand-container d-flex justify-content-center mt-5">
                                <IconSvg className="logoIconApp p-2"></IconSvg>
                                <span className="brand-span-container pl-3">Jegty</span>
                            </div>
                            <NavigationMenu elems={navitagionElemens}></NavigationMenu>
                            <div className="d-flex justify-content-center mt-5">
                                {currentLocation !== "/new-game" ? <button
                                    onClick={() => history.push("/new-game")}
                                    className="btn btn-custom btn-lg page-scroll">
                                    New game
                                </button> : null}

                            </div>
                            {jegtyUser ? <AvatarBadge email={user.email} name={jegtyUser.name}></AvatarBadge> : null}

                        </div>
                        <div className="col-6 infiniteScroll">
                            <div className="top">
                                <span className="title">{transformCurrentLocation()}</span></div>
                            <Switch>
                                <LoggedRoute exact path="/" component={Home} />
                                <LoggedRoute exact path="/profile" component={Profile} />
                                <LoggedRoute exact path="/friends" component={Friends} />
                                <LoggedRoute exact path="/tournaments" component={Tournaments} />
                                <LoggedRoute exact path="/games" component={Games} />
                                <LoggedRoute exact path="/new-game" component={CreateGame} />
                                <LoggedRoute path="*">
                                    <NotFound></NotFound>
                                </LoggedRoute>
                            </Switch>
                        </div>
                        <div className="col-3 friendsList">
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
