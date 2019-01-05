import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ForgotPassword from './containers/ForgotPassword'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import protectContainer from './containers/protectContainer'
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
                </Switch>
            </div>
        )
    }
}

export default Router
