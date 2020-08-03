import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { User } from "../../types/types";

export interface PrivateRouteProps extends RouteProps {
  user: User | null;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  user,
  ...props
}) => {
  if (user === null) {
    return (
      <Route
        {...props}
        component={() => (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      />
    );
  } else {
    return <Route {...props} />;
  }
};
