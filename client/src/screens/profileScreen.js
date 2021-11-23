import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  userDetailsActions,
  userUpdateAction,
} from "../actions/userLoginActions";
import { orderBelongsToMeAction } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const orderBelongsToMe = useSelector((state) => state.orderBelongsToMe);
  const {
    loading: loadingMyOrder,
    orders,
    error: errorInMyOrder,
  } = orderBelongsToMe;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { user: loggedInUser } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;
  useEffect(() => {
    if (!loggedInUser) history.push("/login");
    else {
      if (!user?.user?.name) {
        dispatch(userDetailsActions("profile")); //this will update the component
      } else {
        setName(user.user.name);
        setEmail(user.user.email);
      }
    }
  }, [dispatch, loggedInUser, history, user]);

  useEffect(() => {
    dispatch(orderBelongsToMeAction());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) setMessage("passwords are different");
    else
      dispatch(
        userUpdateAction({ _id: loggedInUser.user._id, name, email, password })
      );
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message varient="danger">{message}</Message>}
        {error && <Message varient="danger">{error}</Message>}
        {success && <Message varient="success">Profile updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
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
          <Form.Group className="pb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="pb-3" controlId="passwordConfirm">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" varient="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingMyOrder ? (
          <Loader />
        ) : errorInMyOrder ? (
          <Message varient="danger">{errorInMyOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" varient="light">
                        Detail
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
