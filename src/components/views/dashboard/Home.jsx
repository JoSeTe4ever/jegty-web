import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { app, db } from "../../../data/firebase";
import { addFriendRequestidToPendingList } from '../../../redux/actions/actions';
import { sendInviteMail } from "./../../../data/cloud-functions";
import { VALID_EMAIL } from "./../../../helpers/validators";
import { Icon } from './../../shared/atoms/Icon';
import { InputField } from './../../shared/atoms/InputField';
import { AvatarList } from './../../shared/mollecules/AvatarList';
import { PendingRequests } from './PendingRequests';

export const Home = (props) => {

    const dispatch = useDispatch();
    const SEARCH_FRIENDS_INPUT_ID = "searchForFriends";
    const EMAIL_TO_FRIEND = "inviteEmail";
    const searchFriendsRef = useRef(null);
    const inviteFriendEmailRef = useRef(null);
    const [searchQueryText, setQueryText] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const friendsIdList = useSelector((state) => state.friends);

    const sendRecommendEmail = (inviteEmail) => {
        sendInviteMail(inviteEmail).then(res => {
            setSeverity("success");
            setMessage("invitation email sucessfully sent");
            setOpenSnackbar(true);
        }, error => {
            setSeverity("error");
            setMessage("Error while sending email");
            setOpenSnackbar(true);
        });
        window.$('#addFriendDialog').modal('hide');
    };

    const sendInternalInvite = (inviteEmail) => {
        //get user by Id and add it in the page.
        //https://gist.github.com/katowulf/6479129

        db.collection("users").where("email", "==", inviteEmail).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                //change to pending users.
                dispatch(addFriendRequestidToPendingList(doc.id))
                setSeverity("success");
                setMessage("internal invitation sucessfully sent");
                window.$('#addFriendDialog').modal('hide');
                setOpenSnackbar(true);
            });
        })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                setSeverity("error");
                setMessage("Error while sending internal invite");
                setOpenSnackbar(true);
            });

    };

    const addUser = () => {
        //check if the user exist jopi
        const inviteEmail = inviteFriendEmailRef.current.value;
        app.auth().fetchSignInMethodsForEmail(inviteEmail)
            .then(providers => {
                if (providers.length === 0) {
                    // this email hasn't signed up yet
                    sendRecommendEmail(inviteEmail);
                } else {
                    // has signed up
                    sendInternalInvite(inviteEmail);
                }
            });
    }

    const showAddFriendDialog = () => {
        window.$('#addFriendDialog').modal('show')
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <React.Fragment>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            <div className="homeContainer">
                <InputField id={SEARCH_FRIENDS_INPUT_ID} labelText="Search friends" value={searchQueryText} innerRef={searchFriendsRef}></InputField>
                <Icon icon={'plus-circle'} aria-hidden="true" onClickCallback={() => showAddFriendDialog()}></Icon>
                <AvatarList friends={friendsIdList}></AvatarList>

                <div className="modal fade" id="addFriendDialog" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                Invite user
                         </div>
                            <div className="modal-body">
                                <div className="mb-1">Please enter email to send invite.</div>
                                <InputField id={EMAIL_TO_FRIEND} labelText="Send email invite to friend" value={inviteEmail} innerRef={inviteFriendEmailRef}
                                    validator={VALID_EMAIL} errorText="Valid email required" required></InputField>
                            </div>
                            <div className="modal-footer mt-1">
                                <button className="btn btn-primary" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-danger" onClick={(event) => addUser(event)}>Accept</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <PendingRequests></PendingRequests>
        </React.Fragment>

    )
}

const mapStateToProps = (state) => ({
    friends: state.friends,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)