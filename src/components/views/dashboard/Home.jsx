import React, { useRef, useState } from 'react'
import { InputField } from './../../shared/atoms/InputField'
import { Icon } from './../../shared/atoms/Icon'
import { connect } from "react-redux";
import { AvatarList } from './../../shared/mollecules/AvatarList'
import { useSelector } from 'react-redux';
export const Home = (props) => {

    const SEARCH_FRIENDS_INPUT_ID = "searchForFriends";
    const EMAIL_TO_FRIEND = "inviteEmail";
    const searchFriendsRef = useRef(null);
    const inviteFriendEmailRef = useRef(null);
    const [searchQueryText, setQueryText] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const friendsIdList = useSelector((state) => state.friends);

    const addUser = () => {
        const inviteEmail = inviteFriendEmailRef.current.value;
        window.$('#addFriendDialog').modal('hide')
    }

    const showAddFriendDialog = () => {
        window.$('#addFriendDialog').modal('show')
    }

    return (
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
                            <InputField id={EMAIL_TO_FRIEND} labelText="Send email invite to friend" value={inviteEmail} innerRef={inviteFriendEmailRef}></InputField>
                        </div>
                        <div className="modal-footer mt-1">
                            <button className="btn btn-primary" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-danger" onClick={(event) => addUser(event)}>Accept</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    friends: state.friends,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)