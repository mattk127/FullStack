import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SharedContext from './SharedContext';
import MailboxList from './MailboxList';

// const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer +200,
  },
  drawer: {
    width: '70vw',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '70vw',
  },
}));

/**
 * @return {object} JSX
 */
function MailboxDrawer() {
  const {mailbox, setMailbox, drawerOpen, setDrawerOpen, toggleDrawerOpen,
    toggleOpenSettings} = React.useContext(SharedContext);

  const selectMailbox= (mailbox) => {
    setMailbox(mailbox);
    setDrawerOpen(false);
  };

  const classes = useStyles();
  return (
    <SharedContext.Provider value={{mailbox, selectMailbox}} >
      <Hidden>
        <Drawer
          className={classes.drawer}
          classes={{paper: classes.drawerPaper}}
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawerOpen}
          ModalProps={{keepMounted: true}}
        >
          <MailboxList/>
          <Divider />
          <List>
            <ListItem button onClick={toggleOpenSettings}>
              <ListItemIcon><SettingsIcon/></ListItemIcon>
              <ListItemText primary='Settings'/>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </SharedContext.Provider>
  );
}

export default MailboxDrawer;
