import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const DrawerItem = ({ title, url, icon, pathname }) => (
    <ListItem button component={Link} to={url} selected={pathname === url}>
        <ListItemIcon style={{ marginLeft: 8 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
    </ListItem>
)

const DrawerList = ({ location }) => (
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
    </List>
)

export default withRouter(DrawerList)
