import React, { useRef, useState } from 'react'
import { InputField } from './../../shared/atoms/InputField'
import { Icon } from './../../shared/atoms/Icon'
import { connect } from "react-redux";


export const Home = () => {

    const SEARCH_FRIENDS_INPUT_ID = "searchForFriends"
    const searchFriendsRef = useRef(null);
    const [searchQueryText, setQueryText] = useState('');

    const addUser = () => {

    }

    const showAddFriendDialog = () => {
        window.$('#addFriendDialog').modal('show')
    }

    return (
        <div className="homeContainer">
            <InputField id={SEARCH_FRIENDS_INPUT_ID} labelText="Search friends" value={searchQueryText} innerRef={searchFriendsRef}></InputField>
            <Icon icon={'plus-circle'} aria-hidden="true" onClickCallback={() => showAddFriendDialog()}></Icon>

            <div className="modal fade" id="addFriendDialog" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            Invite user
                         </div>
                        <div className="modal-body">
                            Please enter email to send invite.
                         </div>
                        <div className="modal-footer">
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)