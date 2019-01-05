import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import protectContainer from './containers/protectContainer'

class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    {protectContainer(
                        <Route exact path="/" component={Home} />
                    )}
                </Switch>
            </div>
        )
    }
}

export default Router
