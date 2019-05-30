import Button from '@material-ui/core/Button/index'
import FormControl from '@material-ui/core/FormControl/index'
import Input from '@material-ui/core/Input/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import withStyles from '@material-ui/core/styles/withStyles'
import LockIcon from '@material-ui/icons/LockOutlined'
import axios from 'axios/index'
import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import CentralPaper from '../../components/CentralPaper'

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    register: {
        marginTop: theme.spacing(1),
    },
})

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            showError: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    loginUser = e => {
        e.preventDefault()
        axios
            .post('/api/auth/login', {
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                localStorage.setItem('JWT', response.headers.authorization)
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({
                    showError: true,
                })
            })
    }

    render() {
        const classes = this.props.classes
        const {showError} = this.state

        if (localStorage.getItem('JWT') === null) {
            return <Redirect to="/"/>
        } else {
            return (
                <CentralPaper headerIcon={<LockIcon/>} title="Login">
                    <form className={classes.form} onSubmit={this.loginUser}>
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
                                <strong>
                                    That email address or password isn't recognized.
                                    Please try again or register now.
                                </strong>
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
