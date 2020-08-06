import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import getUserFromLs from "../../helpers/get-user-from-ls";

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...props }) => {
  if (getUserFromLs() === null) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
