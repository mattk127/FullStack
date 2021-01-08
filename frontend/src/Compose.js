import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
  const {openCompose, setOpenCompose} = React.useContext(SharedContext);

  const handleComposeClose = () => {
    setOpenCompose(false);
  };

  if (openCompose) {
    return (
      <div>
        <Toolbar/>
        <Toolbar/>
        <Dialog fullScreen open={open} onClose={handleComposeClose}>
          <Toolbar/>
          <Toolbar className={classes.custom}>
            <IconButton className={classes.button}
              onClick={handleComposeClose}
              aria-label="close">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton className={classes.button1}>
              <ArrowForwardIcon/>
            </IconButton>
          </Toolbar>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}
