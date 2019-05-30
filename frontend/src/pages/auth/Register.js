import Button from '@material-ui/core/Button/index'
import FormControl from '@material-ui/core/FormControl/index'
import Input from '@material-ui/core/Input/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import withStyles from '@material-ui/core/styles/withStyles'
import {CheckCircle} from '@material-ui/icons/index'
import LockIcon from '@material-ui/icons/LockOutlined'
import axios from 'axios/index'
import React from 'react'
import {Link} from 'react-router-dom'
import CentralPaper from '../../components/CentralPaper'

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
})

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            messageFromServer: '',
            alreadyExistsError: false,
            invalidEmailError: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    registerUser = e => {
        e.preventDefault()
        axios
            .post('/api/auth/register', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            })
            .then(response => {
                this.setState({
                    messageFromServer: response.data,
                    alreadyExistsError: false,
                    invalidEmailError: false,
                })

                window.location.href = "/login"
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.setState({
                        alreadyExistsError: true,
                        invalidEmailError: false,
                    })
                }
            })
    }

    render() {
        const classes = this.props.classes
        const {
            messageFromServer,
            alreadyExistsError,
            invalidEmailError,
        } = this.state

        if (messageFromServer === 'User registered') {
            return (
                <CentralPaper
                    headerIcon={<CheckCircle/>}
                    title="Registration Successful"
                >
                    <Button component={Link} to="/login" color="primary">
                        Go Login
                    </Button>
                </CentralPaper>
            )
        } else {
            return (
                <CentralPaper headerIcon={<LockIcon/>} title="Register">
                    <form className={classes.form} onSubmit={this.registerUser}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstName">
                                First Name
                            </InputLabel>
                            <Input
                                id="firstName"
                                name="firstName"
                                autoComplete="first-name"
                                autoFocus
                                onChange={this.handleChange('firstName')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastName">
                                Last Name
                            </InputLabel>
                            <Input
                                id="lastName"
                                name="lastName"
                                autoComplete="last-name"
                                onChange={this.handleChange('lastName')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={this.handleChange('email')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
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
                            Register
                        </Button>
                    </form>

                    {alreadyExistsError && (
                        <div>
                            <p>
                                That username or email is already taken. Please
                                choose another or login.
                            </p>
                        </div>
                    )}
                    {invalidEmailError && (
                        <div>
                            <p>
                                That email address is not known to the admins.
                                Please use an email that is registered with the
                                association.
                            </p>
                        </div>
                    )}
                    <Button component={Link} to="/login">
                        Login instead
                    </Button>
                </CentralPaper>
            )
        }
    }
}

export default withStyles(styles)(Register)
