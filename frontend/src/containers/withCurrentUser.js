import React from 'react'
import { requestCurrentUser } from '../actions/currentUser'
import { connect } from 'react-redux'

export default function withCurrentUser(WrappedComponent) {
    class Wrapper extends React.Component {
        componentDidMount() {
            if (
                !this.props.currentUser.loaded &&
                !this.props.currentUser.loading
            ) {
                this.props.requestCurrentUser()
            }
        }

        render() {
            return (
                <WrappedComponent
                    currentUser={this.props.currentUser}
                    {...this.props}
                />
            )
        }
    }

    const mapStateToProps = state => ({
        currentUser: state.currentUser,
    })

    const mapDispatchToProps = dispatch => ({
        requestCurrentUser: () => dispatch(requestCurrentUser()),
    })

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Wrapper)
}
