import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  orderDetailAction,
  orderPaidAction,
  orderDeliverAction,
} from "../actions/orderActions";
import {
  orderPaidReset,
  orderDeliverReset,
  orderDetailReset,
} from "../constants/orderConstant";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetail = useSelector((state) => state.orderDetail);
  const userLogin = useSelector((state) => state.userLogin);
  const orderPaid = useSelector((state) => state.orderPaid);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading, order, error } = orderDetail;
  const { loading: loadingPaid, success: successPaid } = orderPaid;
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const {
    user: { user: userInfo },
  } = userLogin;

  const itemPrice = +order?.orderItems
    .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
    .toFixed(2);

  //first clear the order detail
  useEffect(() => {
    dispatch({ type: orderDetailReset });
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPaid || successDeliver) {
      dispatch({ type: orderPaidReset });
      dispatch({ type: orderDeliverReset });
      dispatch(orderDetailAction(orderId));
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    orderId,
    order,
    successDeliver,
    successPaid,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(orderPaidAction(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(orderDeliverAction(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order?.user.name}</strong>
              </p>
              <p>
                <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
              </p>
              <p>
                <strong>
                  Adress: {order?.shippingAddress.address},
                  {order?.shippingAddress.city},
                  {order?.shippingAddress.postalCode},
                  {order?.shippingAddress.country}
                </strong>
              </p>
              {order?.isDelivered ? (
                <Message varient="success">
                  Delivered at {order?.deliveredAt}
                </Message>
              ) : (
                <Message varient="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <div>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {order?.paymentMethod}
              </div>
              {order?.isPaid ? (
                <Message varient="success">Paid at {order?.paidAt}</Message>
              ) : (
                <Message varient="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Your Order Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPaid && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={+order?.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
