import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import React from 'react'
import DrawerList from './DrawerList'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { Link } from 'react-router-dom'
import withCurrentUser from '../containers/withCurrentUser'

const drawerWidth = 260

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    profileButtonText: {
        marginRight: theme.spacing(1),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100vh',
        overflow: 'auto',
    },
})

class LoggedInPage extends React.Component {
    state = {
        drawerOpen: true,
        anchorElement: null,
    }

    handleDrawerOpen = () => {
        this.setState({ drawerOpen: true })
    }

    handleDrawerClose = () => {
        this.setState({ drawerOpen: false })
    }

    onLogout = e => {
        localStorage.removeItem('JWT')
        window.location.href = '/login'
    }

    handleMenu = event => {
        this.setState({ anchorElement: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorElement: null })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        this.state.drawerOpen && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.drawerOpen}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.drawerOpen &&
                                    classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            {this.props.title}
                        </Typography>
                        <>
                            <Button
                                aria-owns={
                                    this.state.anchorElement
                                        ? 'menu-appbar'
                                        : undefined
                                }
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <span className={classes.profileButtonText}>
                                    {this.props.currentUser.loaded
                                        ? this.props.currentUser.user.firstName
                                        : undefined}
                                </span>
                                <AccountCircleIcon />
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorElement}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.anchorElement)}
                                onClose={this.handleClose}
                            >
                                <MenuItem component={Link} to="/profile">
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={this.onLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.drawerOpen && classes.drawerPaperClose
                        ),
                    }}
                    open={this.state.drawerOpen}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <DrawerList />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default withCurrentUser(withStyles(styles)(LoggedInPage))
