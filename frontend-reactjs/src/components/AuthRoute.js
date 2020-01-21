import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import utils from '../utils'

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            utils.isAuth() === null ? (
          <Component {...props} />
        ) : (
          <Redirect to={'/dashboard'}
          />
        )
      )} />
    );
        
}

export default AuthRoute
