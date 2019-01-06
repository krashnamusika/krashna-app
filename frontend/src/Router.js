import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ForgotPassword from './containers/ForgotPassword'
import Home from './containers/Home'
import Login from './containers/Login'
import NotFound from './containers/NotFound'
import protectContainer from './containers/protectContainer'
import Register from './containers/Register'
import ResetPassword from './containers/ResetPassword'

class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact
                        path="/forgot-password"
                        component={ForgotPassword}
                    />
                    <Route
                        exact
                        path="/reset-password"
                        component={ResetPassword}
                    />
                    {protectContainer(
                        <Route exact path="/" component={Home} />
                    )}
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default Router
