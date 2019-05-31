import Button from '@material-ui/core/Button/index'
import FormControl from '@material-ui/core/FormControl/index'
import Input from '@material-ui/core/Input/index'
import InputLabel from '@material-ui/core/InputLabel/index'
import withStyles from '@material-ui/core/styles/withStyles'
import EmailIcon from '@material-ui/icons/EmailRounded'
import axios from 'axios/index'
import React from 'react'
import { Link } from 'react-router-dom'
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

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            showError: false,
            messageSent: false,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    sendEmail = e => {
        e.preventDefault()
        if (this.state.email === '') {
            this.setState({
                showError: false,
                messageSent: false,
            })
        } else {
            axios
                .post(`/api/auth/forgot-password?email=${this.state.email}`)
                .then(() => {
                    this.setState({
                        showError: false,
                        messageSent: true,
                    })
                })
                .catch(() => {
                    this.setState({
                        showError: true,
                        messageSent: false,
                    })
                })
        }
    }

    render() {
        const classes = this.props.classes
        const { showError, messageSent } = this.state

        return (
            <CentralPaper headerIcon={<EmailIcon />} title="Forgot Password">
                <form className={classes.form} onSubmit={this.sendEmail}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                            onChange={this.handleChange('email')}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send me a password reset link
                    </Button>
                </form>

                {showError && (
                    <div>
                        <p>
                            <strong>
                                That email address isn't recognized. Please try
                                again or register now.
                            </strong>
                        </p>
                    </div>
                )}
                {messageSent && (
                    <div>
                        <p>
                            <strong>
                                Password reset email sent successfully! Check
                                your mail for the reset link.
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
            </CentralPaper>
        )
    }
}

export default withStyles(styles)(ForgotPassword)
