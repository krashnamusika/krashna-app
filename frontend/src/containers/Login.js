import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import withStyles from '@material-ui/core/styles/withStyles'
import LockIcon from '@material-ui/icons/LockOutlined'
import axios from 'axios'
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import CentralPaper from '../components/CentralPaper'

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    register: {
        marginTop: theme.spacing.unit,
    },
})

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            showError: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    loginUser(e) {
        e.preventDefault()
        axios
            .post('/api/login', {
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                if (response.data === `Email and password don't match`) {
                    this.setState({
                        showError: true,
                    })
                } else {
                    localStorage.setItem('JWT', response.data.token)
                    this.setState({
                        loggedIn: true,
                        showError: false,
                    })
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const classes = this.props.classes
        const { loggedIn, showError } = this.state

        if (loggedIn) {
            return <Redirect to="/" />
        } else {
            return (
                <CentralPaper headerIcon={<LockIcon />} title="Login">
                    <form
                        className={classes.form}
                        onSubmit={this.loginUser.bind(this)}
                    >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                autoFocus
                                onChange={this.handleChange('email')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
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
                            Login
                        </Button>
                    </form>

                    {showError && (
                        <div>
                            <p>
                                That username or password isn't recognized.
                                Please try again or register now.
                            </p>
                        </div>
                    )}
                    <Button
                        component={Link}
                        to="/register"
                        className={classes.register}
                    >
                        Register instead
                    </Button>
                    <Button component={Link} to="/forgot-password">
                        Forgot Password?
                    </Button>
                </CentralPaper>
            )
        }
    }
}

export default withStyles(styles)(Login)
