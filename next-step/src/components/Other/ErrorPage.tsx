import React from "react";
import PropTypes from "prop-types";

export const ErrorPage = (props) => {
  const { exception } = props;
  console.log(exception);

  return (
    <React.Fragment>
      <h1>Error Page</h1>
    </React.Fragment>
  );
};

ErrorPage.propTypes = {
  exception: PropTypes.string,
};
