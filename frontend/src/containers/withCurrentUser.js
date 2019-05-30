import React from 'react'
import {receiveCurrentUser, requestCurrentUser} from "../actions/currentUser";
import {connect} from "react-redux";
import axios from "axios";

export default function withCurrentUser(WrappedComponent) {
    class Wrapper extends React.Component {
        componentDidMount() {
            if (!this.props.currentUser.loaded && !this.props.currentUser.loading) {
                this.props.requestCurrentUser()
                axios
                    .get('/api/auth/current-user', {headers: {Authorization: localStorage.JWT}})
                    .then(response => {
                        this.props.receiveCurrentUser(response.data)
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }

        render() {
            return <WrappedComponent
                currentUser={this.props.currentUser}
                {...this.props}
            />;
        }
    }

    const mapStateToProps = state => ({
        currentUser: state.currentUser
    });

    const mapDispatchToProps = dispatch => ({
        requestCurrentUser: payload => dispatch(requestCurrentUser()),
        receiveCurrentUser: payload => dispatch(receiveCurrentUser(payload)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper)
}
