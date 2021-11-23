import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProducts,
  productCreateAction,
  productDeleteAction,
} from "../actions/productAction";
import { productCreateReset } from "../constants/productContant";
import Paginate from "../components/Paginate";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
    error: errorCreate,
  } = productCreate;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userInfo = user?.user;

  useEffect(() => {
    dispatch({ type: productCreateReset });
    if (!userInfo.isAdmin) history.push("/login");

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else dispatch(listProducts("", pageNumber));
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const productDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) dispatch(productDeleteAction(id));
  };
  const createProductHandler = () => {
    dispatch(productCreateAction());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"> Create Product</i>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message varient="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message varient="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button varient="light" className="btn-sm" type="button">
                        {" "}
                        <i className="fas fa-edit"></i>{" "}
                      </Button>
                    </LinkContainer>
                    <Button
                      varient="danger"
                      className="btn-sm"
                      onClick={() => productDeleteHandler(product._id)}
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
          <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
