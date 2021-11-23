import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else history.push("/");
  };

  return (
    <Form style={{ display: "flex" }} onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        placeholder="search products"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" varient="outline-success" className="p-3 m-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
