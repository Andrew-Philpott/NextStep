import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { User } from "../../types/types";

export interface PrivateRouteProps extends RouteProps {
  user?: User;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  if (props.user && props.user.token !== "") {
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

// <Route
// {...rest}
// render={(props) =>
//   user !== null ? (
//     <Component children={props} />
//   ) : (
//     <Redirect
//       to={{ pathname: "/login", state: { from: props.location } }}
//     />
//   )
// }
// />;
