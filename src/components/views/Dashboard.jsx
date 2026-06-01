import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, useLocation } from "react-router-dom";
import { ReactComponent as IconSvg } from '../../assets/icons/icono.svg';
import { CreateGame } from "../../components/views/dashboard/CreateGame";
import { GameDetails } from "../../components/views/dashboard/GameDetails";
import { Games } from "../../components/views/dashboard/Games";
import { GamesCatalogue } from "../../components/views/dashboard/GamesCatalogue";
import { Profile } from "../../components/views/dashboard/Profile";
import { Tournaments } from "../../components/views/dashboard/Tournaments";
import { getGamesByJegtyUserId, getJegtyUserById } from "../../data/jegty-api";
import { pb } from "../../data/pocketbase";
import GuardedRoute from '../shared/GuardedRoute';
import { AvatarBadge } from '../shared/mollecules/AvatarBadge';
import { Home } from '../views/dashboard/Home';
import { NavigationMenu } from './../../components/shared/mollecules/NavigationMenu';
import {
    addGameidToUserList, addJegtyUser,
    setHasPending
} from "./../../redux/actions/actions";
import { NotFound } from './NotFound';

export const Dashboard = () => {
    const LoggedRoute = GuardedRoute(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const jegtyUser = useSelector((state) => state.jegtyUser);
    const location = useLocation();
    const history = useHistory();
    const [currentLocation, setCurrentLocation] = useState(location.pathname);
    const [navitagionElemens, setNavigationElemens] = useState([
    { icon: 'dashboard', navLocation: '/games-catalogue', navText: 'Games Catalogue', isPending: false },
    { icon: 'gamepad', navLocation: '/games', navText: 'My Games', isPending: false },
    { icon: 'users', navLocation: '/', navText: 'Friends', isPending: false },
    { icon: 'futbol-o', navLocation: '/tournaments', navText: 'Tournaments', isPending: false },
    { icon: 'user', navLocation: '/profile', navText: 'Profile', isPending: false }]);

    // remove backdrop from modal if exists.
    // this is like onInit.
    useEffect(() => {
        const modalBackgroundArray = document.getElementsByClassName("modal-backdrop fade show")
        const body = document.getElementById("page-top");
        body.classList.remove("modal-open");
        
        if (modalBackgroundArray && modalBackgroundArray.length > 0) {
            modalBackgroundArray[0].remove();
        }


        if (user !== undefined && user.uid !== undefined) {
            getGamesByJegtyUserId(user.uid).then(gamesList => {
                gamesList = gamesList.docs.map(doc => {
                    dispatch(addGameidToUserList(doc.data().id));
                });
            });


            const syncPending = async () => {
                const pending = await pb.collection('pending_requests').getFullList({
                    filter: `status = "pending" && (toUser = "${user.uid}" || toEmail = "${user.email}")`,
                });
                const data = pending.length > 0;
                navitagionElemens[1].isPending = data; // set the menu badge 
                setNavigationElemens([...navitagionElemens]);
                dispatch(setHasPending(data));
            };
            syncPending();
            pb.collection('pending_requests').subscribe('*', syncPending, {
                filter: `status = "pending" && (toUser = "${user.uid}" || toEmail = "${user.email}")`,
            });
        }

        if (jegtyUser.id === undefined) {
            getJegtyUserById(user.uid).then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                console.log(`ERROR ${error}`, "ERROR");
            });
        }

        return () => {
            pb.collection('pending_requests').unsubscribe('*');
        };
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
        <>
            <section className="dashboardShell">
                <div className="dashboardGrid">
                        <aside className="fixedMenu">
                            <div className="brand-container">
                                <IconSvg className="logoIconApp p-2"></IconSvg>
                                <span className="brand-span-container pl-3">Jegty</span>
                            </div>
                            <NavigationMenu elems={navitagionElemens}></NavigationMenu>
                            <div className="new-game-container d-flex justify-content-center mt-5">
                                {currentLocation !== "/new-game" ? <button
                                    onClick={() => history.push("/new-game")}
                                    className="btn btn-custom btn-lg page-scroll">
                                    New game
                                </button> : null}
                            </div>

                        </aside>
                        <main className="infiniteScroll">
                            <div className="top">
                                <span className="title">{transformCurrentLocation()}</span></div>
                            <Switch>
                                <LoggedRoute exact path="/" component={Home} />
                                <LoggedRoute exact path="/profile" component={Profile} />
                                <LoggedRoute exact path="/tournaments" component={Tournaments} />
                                <LoggedRoute exact path="/games-catalogue" component={GamesCatalogue} />
                                <LoggedRoute exact path="/games" component={Games} />
                                <LoggedRoute exact path="/new-game" component={CreateGame} />
                                <LoggedRoute exact path="/game-details" component={GameDetails} />
                                <LoggedRoute path="*" component={NotFound}>
                                    <NotFound></NotFound>
                                </LoggedRoute>
                            </Switch>
                        </main>
                        <aside className="friendsList">
                            <div className="currentLoggedUser">
                                {jegtyUser ? <AvatarBadge email={user.email} name={jegtyUser.name}></AvatarBadge> : null}
                            </div>
                        </aside>
                </div>
                <footer>
                </footer>
            </section>
        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
