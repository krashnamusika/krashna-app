import React from 'react'
import LoggedInPage from '../../components/LoggedInPage'
import FormControl from "@material-ui/core/FormControl/index";
import InputLabel from "@material-ui/core/InputLabel/index";
import Input from "@material-ui/core/Input/index";
import Button from "@material-ui/core/Button/index";
import axios from "axios/index";
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    updatePasswordForm: {
        maxWidth: '400px',
        textAlign: 'center',
    },
    updatePassword: {
        marginTop: theme.spacing(1),
    },
})

class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            updated: false,
            error: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    updatePassword = e => {
        e.preventDefault()

        axios
            .post('/api/auth/update-password', {
                password: this.state.password,
            }, {headers: {Authorization: localStorage.JWT}})
            .then(() => {
                this.setState({
                    updated: true,
                    error: false,
                })
            })
            .catch(() => {
                this.setState({
                    updated: false,
                    error: true,
                })
            })
    }

    render() {
        const classes = this.props.classes
        const {error, updated} = this.state

        return (
            <LoggedInPage title="Profile">
                <form className={classes.updatePasswordForm} onSubmit={this.updatePassword}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">New password</InputLabel>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange('password')}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.updatePassword}
                    >
                        Change password
                    </Button>
                    {error && (
                        <p>
                            Something went wrong while updating your password! Try logging out and logging in again, or
                            contact the admins for assistance.
                        </p>
                    )}
                    {updated && (
                        <p>
                            Password updated successfully!
                        </p>
                    )}
                </form>
            </LoggedInPage>
        )
    }
}

export default withStyles(styles)(Profile)
