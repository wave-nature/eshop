import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keyword}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to eshop",
  keyword: "electronics, buy electronics",
  description: "we sell the best products for cheap",
};

export default Meta;
