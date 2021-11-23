import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { userListAction, userDeleteAction } from "../actions/userLoginActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userInfo = user?.user;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(userListAction());
    // not logged in or not an admin redirect to login page
    else history.push("/login");
  }, [dispatch, userInfo, history, successDelete]);

  const userDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(userDeleteAction(id));
  };
  return (
    <>
      <h1>User List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button varient="light" className="btn-sm" type="button">
                      {" "}
                      <i className="fas fa-edit"></i>{" "}
                    </Button>
                  </LinkContainer>
                  <Button
                    varient="danger"
                    className="btn-sm"
                    onClick={() => userDeleteHandler(user._id)}
                    type="button"
                  >
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
