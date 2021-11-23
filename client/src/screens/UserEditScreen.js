import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {
  userDetailsActions,
  userUpdateByAdminAction,
} from "../actions/userLoginActions";
import { userUpdateByAdminReset } from "../constants/userConstant";

const UserEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
  const {
    loading: loadingUpdateUser,
    success: successUpdateUser,
    error: errorUpdatingUser,
  } = userUpdateByAdmin;
  const userId = match.params.id;

  useEffect(() => {
    if (successUpdateUser) {
      dispatch({ type: userUpdateByAdminReset });
      history.push("/admin/users");
    } else {
      if (!user?.user?.name || user?.user?._id !== userId)
        dispatch(userDetailsActions(userId));
      else {
        setName(user.user.name);
        setEmail(user.user.email);
        setIsAdmin(user.user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdateUser, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateByAdminAction({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update User</h1>
        {loadingUpdateUser && <Loader />}
        {errorUpdatingUser && (
          <Message varient="danger">{errorUpdatingUser}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message varient="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                defaultValue={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="pb-3" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
