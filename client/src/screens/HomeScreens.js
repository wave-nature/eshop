import React, { useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreens = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (error) return <Message varient="danger">{error}</Message>;
  return (
    <>
      <h1>Latest Products</h1>
      {loading && <Loader />}
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreens;
