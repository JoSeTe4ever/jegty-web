import React, { useEffect, useHistory } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Switch } from "react-router-dom";
import { ReactComponent as IconSvg } from '../../assets/icons/icono.svg';
import { Friends } from "../../components/views/dashboard/Friends";
import { Profile } from "../../components/views/dashboard/Profile";
import GuardedRoute from '../shared/GuardedRoute';
import { Home } from '../views/dashboard/Home';
import { NotFound } from './NotFound';
import { NavigationMenu } from './../../components/shared/mollecules/NavigationMenu';
import { db } from "./../../data/firebase";
import { addJegtyUser } from "./../../redux/actions/actions";
import { AvatarBadge } from '../shared/mollecules/AvatarBadge';

export const Dashboard = () => {
    const LoggedRoute = GuardedRoute(true); // this shuold be the user logged in
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const jegtyUser = useSelector((state) => state.jegtyUser);

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

        if (user !== undefined && user.uid !== undefined && jegtyUser.id === undefined) {
            db.collection('users').doc(user.uid).get().then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                console.log(`ERROR ${error}`, "ERROR");
            });
        }

    }, [])

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
                                <button
                                    onClick={() => console.log(true)}
                                    className="btn btn-custom btn-lg page-scroll">
                                    New game
                                </button>
                            </div>
                            <AvatarBadge email={user.email} name={jegtyUser.name}></AvatarBadge>
                        </div>
                        <div className="col-6 infiniteScroll">
                            <div className="top">TOP</div>
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
