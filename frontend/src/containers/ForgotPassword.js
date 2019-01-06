import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import withStyles from '@material-ui/core/styles/withStyles'
import EmailIcon from '@material-ui/icons/EmailRounded'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import CentralPaper from '../components/CentralPaper'

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    register: {
        marginTop: theme.spacing.unit,
    },
})

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            showError: false,
            messageFromServer: '',
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
                messageFromServer: '',
            })
        } else {
            axios
                .post('/api/password/forgot', {
                    email: this.state.email,
                })
                .then(response => {
                    console.log(response.data)
                    if (response.data === 'Email not in DB') {
                        this.setState({
                            showError: true,
                            messageFromServer: '',
                        })
                    } else if (response.data === 'Recovery email sent') {
                        this.setState({
                            showError: false,
                            messageFromServer: response.data,
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }

    render() {
        const classes = this.props.classes
        const { showError, messageFromServer } = this.state

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
                            That email address isn't recognized. Please try
                            again or register now.
                        </p>
                    </div>
                )}
                {messageFromServer === 'Recovery email sent' && (
                    <div>
                        <p>Password reset email sent successfully!</p>
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
