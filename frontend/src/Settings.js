import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SaveIcon from '@material-ui/icons/Save';
import Toolbar from '@material-ui/core/Toolbar';
import SharedContext from './SharedContext';
// import AppBar from '@material-ui/core/AppBar';
// code for the dialog taken from https://material-ui.com/components/dialogs/

const useStyles = makeStyles((theme) => ({
  custom: {
    justifyContent: 'space-between',
    width: '100vw',
  },
  button: {
    edge: 'start',
    color: 'inherit',
  },
  button1: {
    edge: 'end',
    color: 'inherit',
  },
}));
/**
 * @return {object}
 */
export default function settingsView() {
  const classes = useStyles();
  const {openSettings, setOpenSettings} = React.useContext(SharedContext);

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  if (openSettings) {
    return (
      <div>
        <Toolbar/>
        <Toolbar/>
        <Dialog fullScreen open={open} onClose={handleSettingsClose}>
          <Toolbar/>
          <Toolbar className={classes.custom}>
            <IconButton className={classes.button}
              onClick={handleSettingsClose}
              aria-label="close">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton className={classes.button1}>
              <SaveIcon/>
            </IconButton>
          </Toolbar>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}
