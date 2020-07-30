import React from "react";

export const ErrorPage = (props) => {
  const { exception } = props;

  return (
    <React.Fragment>
      <h1>Error Page</h1>
      <h2>{exception}</h2>
    </React.Fragment>
  );
};
