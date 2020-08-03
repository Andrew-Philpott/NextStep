import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { User } from "../../types/types";

export interface PrivateRouteProps extends RouteProps {
  user: User | undefined;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  user,
  ...props
}) => {
  console.log(user);
  if (!user) {
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
