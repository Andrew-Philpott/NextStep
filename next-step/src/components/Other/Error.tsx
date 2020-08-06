import React from "react";

type Props = {
  exception: string;
};

const Error: React.FunctionComponent<Props> = ({ exception }) => {
  return (
    <React.Fragment>
      <h1>Error Page</h1>
    </React.Fragment>
  );
};

export default Error;
