import React from 'react'
import { Unauthorized} from './../views/Unauthorized'
import { Route } from "react-router-dom";

export default function GuardedRoute(user) {
    return function({ component: Component, ...rest }) {
      return (
        <Route
          {...rest}
          render={props =>
            !!user ? <Component {...props} /> : <Unauthorized />
          }
        />
      );
    };
  }