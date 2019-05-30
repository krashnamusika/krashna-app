import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import ForgotPassword from './pages/auth/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/auth/Profile'
import Login from './pages/auth/Login'
import NotFound from './pages/NotFound'
import protectPage from './pages/protectPage'
import Register from './pages/auth/Register'
import ResetPassword from './pages/auth/ResetPassword'
import Schedule from "./pages/schedule/Schedule";
import ManageSchedule from "./pages/schedule/ManageSchedule";
import Members from "./pages/members/Members";
import ManageMembers from "./pages/members/ManageMembers";

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
                    {protectPage(
                        <Route exact path="/" component={Home} />
                    )}
                    {protectPage(
                        <Route exact path="/profile" component={Profile} />
                    )}
                    {protectPage(
                        <Route exact path="/schedule" component={Schedule} />
                    )}
                    {protectPage(
                        <Route exact path="/schedule/manage" component={ManageSchedule} />
                    )}
                    {protectPage(
                        <Route exact path="/repertoire" component={Schedule} />
                    )}
                    {protectPage(
                        <Route exact path="/repertoire/manage" component={ManageSchedule} />
                    )}
                    {protectPage(
                        <Route exact path="/members" component={Members} />
                    )}
                    {protectPage(
                        <Route exact path="/members/manage" component={ManageMembers} />
                    )}
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default Router
