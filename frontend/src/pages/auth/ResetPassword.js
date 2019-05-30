import Button from '@material-ui/core/Button/index'
import FormControl from '@material-ui/core/FormControl/index'
import Input from '@material-ui/core/Input/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import withStyles from '@material-ui/core/styles/withStyles'
import EmailIcon from '@material-ui/icons/EmailRounded'
import ErrorIcon from '@material-ui/icons/Error'
import LoadingIcon from '@material-ui/icons/MoreHoriz'
import axios from 'axios/index'
import queryString from 'query-string/index'
import React from 'react'
import {Link} from 'react-router-dom'
import CentralPaper from '../../components/CentralPaper'

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    register: {
        marginTop: theme.spacing(1),
    },
})

class ResetPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            update: false,
            isLoading: true,
            error: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    componentDidMount() {
        const token = queryString.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        }).token

        axios
            .get('/api/auth/verify-password-reset-token', {
                params: {
                    token,
                },
            })
            .then(response => {
                this.setState({
                    update: false,
                    isLoading: false,
                    error: false,
                })

            })
            .catch(error => {
                this.setState({
                    update: false,
                    isLoading: false,
                    error: true,
                })
            })
    }

    updatePassword = e => {
        e.preventDefault()
        const token = queryString.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        }).token

        axios
            .post('/api/auth/update-password-after-reset', {
                token,
                password: this.state.password,
            })
            .then(response => {
                this.setState({
                    updated: true,
                    error: false,
                })
            })
            .catch(error => {
                this.setState({
                    updated: false,
                    error: true,
                })
            })
    }

    render() {
        const classes = this.props.classes
        const {error, isLoading, updated} = this.state

        if (error) {
            return (
                <CentralPaper
                    headerIcon={<ErrorIcon/>}
                    title="Reset Password Failed"
                >
                    <p>
                        There was a problem resetting your password. Please send
                        another reset link or contact the admins.
                    </p>
                    <Button
                        component={Link}
                        to="/forgot-password"
                        className={classes.register}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Send another reset link
                    </Button>
                    <a
                        href="mailto:webcie@krashna.nl"
                        style={{width: '100%'}}
                    >
                        <Button
                            className={classes.register}
                            fullWidth
                            variant="contained"
                            color="secondary"
                        >
                            Contact the admins
                        </Button>
                    </a>
                </CentralPaper>
            )
        } else if (isLoading) {
            return <CentralPaper headerIcon={<LoadingIcon/>} title="Loading"/>
        } else {
            return (
                <CentralPaper headerIcon={<EmailIcon/>} title="Reset Password">
                    <form
                        className={classes.form}
                        onSubmit={this.updatePassword}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">New Password</InputLabel>
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
                            className={classes.submit}
                        >
                            Update password
                        </Button>
                    </form>

                    {updated && (
                        <div>
                            <p>
                                Your password has been successfully reset,
                                please try logging in again.
                            </p>
                            <Button
                                component={Link}
                                to="/login"
                                className={classes.register}
                                variant="outlined"
                                color="default"
                            >
                                Login
                            </Button>
                        </div>
                    )}
                </CentralPaper>
            )
        }
    }
}

export default withStyles(styles)(ResetPassword)
