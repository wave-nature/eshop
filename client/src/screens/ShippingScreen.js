import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter address"
            defaultValue={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter city"
            defaultValue={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter postal code"
            defaultValue={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="pb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter country"
            defaultValue={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" varient="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
