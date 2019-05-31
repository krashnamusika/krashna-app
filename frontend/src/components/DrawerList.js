import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import PeopleIcon from '@material-ui/icons/People'
import RepertoireIcon from '@material-ui/icons/LibraryMusic'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import withCurrentUser from '../containers/withCurrentUser'

const DrawerItem = ({ title, url, icon, pathname }) => (
    <ListItem button component={Link} to={url} selected={pathname === url}>
        <ListItemIcon style={{ marginLeft: 8 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
    </ListItem>
)

const DrawerList = ({ location, currentUser }) => (
    <List>
        <DrawerItem
            title="Home"
            url="/"
            icon={<HomeIcon />}
            pathname={location.pathname}
        />
        <DrawerItem
            title="Schedule"
            url="/schedule"
            icon={<MusicNoteIcon />}
            pathname={location.pathname}
        />
        {currentUser.loaded &&
            currentUser.user.authorities.some(a => a.id === 'SCHEDULER') && (
                <DrawerItem
                    title="Manage Schedule"
                    url="/schedule/manage"
                    icon={<MusicNoteIcon />}
                    pathname={location.pathname}
                />
            )}
        <DrawerItem
            title="Repertoire"
            url="/repertoire"
            icon={<RepertoireIcon />}
            pathname={location.pathname}
        />
        {currentUser.loaded &&
            currentUser.user.authorities.some(a => a.id === 'SCHEDULER') && (
                <DrawerItem
                    title="Manage Repertoire"
                    url="/repertoire/manage"
                    icon={<RepertoireIcon />}
                    pathname={location.pathname}
                />
            )}
        <DrawerItem
            title="Members"
            url="/members"
            icon={<PeopleIcon />}
            pathname={location.pathname}
        />
        {currentUser.loaded &&
            currentUser.user.authorities.some(a => a.id === 'ADMIN') && (
                <DrawerItem
                    title="Manage Members"
                    url="/members/manage"
                    icon={<PeopleIcon />}
                    pathname={location.pathname}
                />
            )}
    </List>
)

export default withCurrentUser(withRouter(DrawerList))
