import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SharedContext from './SharedContext';
import AppBar from './AppBar';
import Content from './Content';
import MailboxDrawer from './MailboxDrawer';
import Settings from './Settings';
import Compose from './Compose';
import Search from './Search';
import MailView from './MailView';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));
// use fullscreen dialogue for setting, compose, and search
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // const [dummy, setDummy] = React.useState('');
  const [mailbox, setMailbox] = React.useState('inbox');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openCompose, setOpenCompose] = React.useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [email, setEmail] = React.useState({});

  window.addEventListener('resize', () => {
    setDrawerOpen(false);
    setOpenSettings(false);
    setOpenCompose(false);
    setOpenSearch(false);
  });

  const toggleOpenSettings = () => {
    if (openCompose) {
      toggleOpenCompose();
    } else if (openSearch) {
      toggleOpenSearch();
    }
    setOpenSettings(!openSettings);
  };

  const toggleOpenCompose = () => {
    if (openSettings) {
      toggleOpenSettings();
    } else if (openSearch) {
      toggleOpenSearch();
    }
    setOpenCompose(!openCompose);
  };

  const toggleOpenSearch = () => {
    if (openCompose) {
      toggleOpenCompose();
    } else if (openSettings) {
      toggleOpenSettings();
    }
    setOpenSearch(!openSearch);
  };

  const toggleOpenEmail = () => {
    if (openCompose) {
      toggleOpenCompose();
    } else if (openSettings) {
      toggleOpenSettings();
    } else if (openSearch) {
      toggleOpenSearch();
    }
    setOpenEmail(!openEmail);
  };

  const toggleDrawerOpen = () => {
    setOpenSettings(false);
    setOpenCompose(false);
    setOpenSearch(false);
    setDrawerOpen(!drawerOpen);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <SharedContext.Provider value= {{
        mailbox, setMailbox,
        drawerOpen, setDrawerOpen,
        toggleDrawerOpen, openSettings,
        setOpenSettings, toggleOpenSettings,
        openCompose, setOpenCompose, toggleOpenCompose,
        openSearch, setOpenSearch, toggleOpenSearch,
        email, openEmail, setOpenEmail, setEmail,
        toggleOpenEmail,
      }}
      >
        <MailboxDrawer/>
        <AppBar/>
        <Content/>
        <Settings/>
        <Compose/>
        <Search/>
        <MailView/>
      </SharedContext.Provider>
    </div>
  );
}

export default App;
