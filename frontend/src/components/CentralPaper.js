import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
            3
        )}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
})

class CentralPaper extends React.Component {
    render() {
        const classes = this.props.classes
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    {this.props.headerIcon && (
                        <Avatar className={classes.avatar}>
                            {this.props.headerIcon}
                        </Avatar>
                    )}
                    <Typography component="h1" variant="h5">
                        {this.props.title}
                    </Typography>
                    {this.props.children}
                </Paper>
            </main>
        )
    }
}

export default withStyles(styles)(CentralPaper)
