import React from "react";
import PropTypes from "prop-types";

type Props = {
  exception: string;
};

export const ErrorPage: React.FunctionComponent<Props> = ({ exception }) => {
  return (
    <React.Fragment>
      <h1>Error Page</h1>
    </React.Fragment>
  );
};
