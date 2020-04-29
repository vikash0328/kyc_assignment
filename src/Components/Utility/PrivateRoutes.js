import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
const Privateroute = ({ render: Render, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("auth") == true ? (
        <Render {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
export default Privateroute;
