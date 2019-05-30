import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import WarningIcon from '@material-ui/icons/WarningRounded'
import React from 'react'
import { Link } from 'react-router-dom'
import CentralPaper from '../components/CentralPaper'

const styles = theme => ({
    spacingAbove: {
        marginTop: theme.spacing(1),
    },
})

class NotFound extends React.Component {
    render() {
        const classes = this.props.classes
        return (
            <CentralPaper headerIcon={<WarningIcon />} title="Page Not Found">
                <Button
                    component={Link}
                    to="/"
                    fullWidth
                    className={classes.spacingAbove}
                    color="primary"
                    variant="contained"
                >
                    Return home
                </Button>
                <Button
                    component={Link}
                    to="/login"
                    fullWidth
                    className={classes.spacingAbove}
                    color="default"
                    variant="contained"
                >
                    Login
                </Button>
            </CentralPaper>
        )
    }
}

export default withStyles(styles)(NotFound)
