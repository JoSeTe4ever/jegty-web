import React, { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon } from "../../shared/atoms/Icon";
import { getPocketBaseErrorMessage, logout, pb } from "./../../../data/pocketbase";
import { addJegtyUser, logValidUser } from "./../../../redux/actions/actions";
import { InputField } from "./../../shared/atoms/InputField";
import { LoadingBar } from "./../../shared/atoms/LoadingBar";
import "./../../views/views.scss";
import { Avatar } from "../../shared/atoms/Avatar";
import { DateTimePicker } from "@material-ui/pickers";
import { getDateFromSeconds } from "helpers/dates";

export const Profile = (props) => {
  const NICKNAME_INPUT_ID = "nickname";
  const EMAIL_INPUT_ID = "email";

  const user = useSelector((state) => state.user);
  const jegtyUser = useSelector((state) => state.jegtyUser);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const userBday = getDateFromSeconds(jegtyUser.birthdate);
  const [birthday, setBirthday] = useState(userBday);

  const inputNickName = useRef(jegtyUser.name);
  const email = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const _logout = () => {
    logout();
    history.push("/");
    dispatch(logValidUser(false));
  };

  const displayMessage = (message, type) => {
    if (type === "INFO") {
      setInfo(message);
      setTimeout(() => {
        setInfo("");
      }, parseInt(5000));
    }

    if (type === "ERROR") {
      setError(message);
      setTimeout(() => {
        setInfo("");
      }, parseInt(5000));
    }
  };

  const updateUser = async () => {
    setLoading(true);
    if (!inputNickName.current.value) {
      inputNickName.current.value = jegtyUser.name;
    }
    const updatedUser = {
      name: inputNickName.current.value,
    };

    if (birthday) {
      updatedUser.birthdate = birthday instanceof Date ? birthday.toISOString() : birthday;
    }

    pb.collection("users")
      .update(user.uid, updatedUser)
      .then((result) => {
        displayMessage(`User ${result} sucessfully updated`, "INFO");
        const newUpdatedUser = { ...jegtyUser };
        newUpdatedUser.name = inputNickName.current.value;
        newUpdatedUser.birthdate = birthday;
        dispatch(addJegtyUser(newUpdatedUser));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        displayMessage(`Error updating, ${getPocketBaseErrorMessage(error)}`, "ERROR");
        setLoading(false);
      });
  };

  const deleteUser = async (event) => {
    setLoading(true);
    const currentUser = pb.authStore.model;
    let errorObtained = undefined;

    await pb
      .collection("users")
      .delete(currentUser.id)
      .then((result) => {
        logout();
        displayMessage(`User ${result} sucessfully updated`, "INFO");
        dispatch(logValidUser(false));
      }).catch(function (error) {
        errorObtained = error;
        displayMessage(errorObtained, "ERROR");
        setLoading(false);
      });
  };

  return (
    <div className="container profileContainer">
      {error ? (
        <div className="alert alert-danger mt-3 fade show" htmlrole="alert">
          {error}
        </div>
      ) : null}
      {info ? (
        <div className="alert alert-success mt-3 fade show" htmlrole="alert">
          {info}
        </div>
      ) : null}
      {isLoading ? <LoadingBar></LoadingBar> : null}
      <div className="profileHeader">
        <span className="profileKicker">PLAYER CONFIG</span>
        <h4 className="mt-2">Settings</h4>
        <p>Fine tune your Jegty identity before jumping into the next match.</p>
      </div>
      <div className="profilePanel row mt-2 justify-content-end">
        <div className="profileAvatarColumn col-2">
          <Avatar
            email={jegtyUser.email}
            value={jegtyUser.name}
            customClass={"profileAvatar"}
          ></Avatar>
          <span className="profileStatus">Online</span>
        </div>
        <div className="profileFormColumn col-10">
          <div className="profileQuickActions form-group">
            <div className=".col-md-6 .offset-md-3">
              <InputField
                id={NICKNAME_INPUT_ID}
                labelText="nickname"
                value={jegtyUser.name}
                innerRef={inputNickName}
                required
                helperText="your display name"
              ></InputField>
              <DateTimePicker
                variant="inline"
                label="Cake date"
                value={birthday}
                onChange={setBirthday}
                inputVariant="outlined"
              />
              <InputField
                id={EMAIL_INPUT_ID}
                labelText="email"
                value={jegtyUser.email}
                innerRef={email}
                readonly={true}
                helperText="your email"
              ></InputField>
            </div>
          </div>

          <div className="form-group">
            <div className="form-icon">
              <Icon
                icon="sign-out"
                aria-hidden="true"
                onClickCallback={() => _logout()}
              ></Icon>
              <span>Sign out</span>
            </div>

            <div className="form-icon">
              <Icon
                icon="ban"
                aria-hidden="true"
                onClickCallback={() => history.push("friends")}
              ></Icon>
              <span>Banned people</span>
            </div>
          </div>

          <div className="profileActions form-group">
            <div className="d-flex flex-column">
              <button
                className="btn btn-primary float-right profileButton mb-2"
                onClick={updateUser}
              >
                Update
              </button>
              <button
                data-toggle="modal"
                data-target="#confirmationModal"
                className="btn btn-danger float-right profileButton"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <ul className="list-group list-group-horizontal">
          <li className="">
            <a href="#" className="badge badge-light mr-3">
              About Jegty
            </a>
          </li>
          <li className="">
            <a href="#" className="badge badge-light mr-3">
              Privacy policy
            </a>
          </li>
          <li className="">
            <a href="#" className="badge badge-light mr-3">
              Help
            </a>
          </li>
        </ul>
      </div>

      <div className="modal fade" id="confirmationModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">Delete user</div>
            <div className="modal-body">
              Are you sure you want to delete your user? You will be
              automatically logged out
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={(event) => deleteUser(event)}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Profile);
