import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import SharedContext from './SharedContext';

// const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  mailbox: {
    maxWidth: '90vw',
  },
}));

/**
 * Prints & returns Mailbox
 * @param {function} setMail
 * @param {string} mailbox
 */
function getmail(setMail, mailbox) {
  fetch('http://localhost:3010/v0/mail?mailbox=' + mailbox)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMail(json[0].mail);
      })
      .catch((error) => {
        console.log(error.toString());
      });
}

/**
   *
   * @param {*} ISODate
   * @return {*}
   */
function fixDate(ISODate) {
  const date = ISODate.split('T')[0];
  const time = ISODate.split('T')[1].slice(0, -1);
  const year = date.split('-')[0];
  let month = date.split('-')[1];
  if (month < 10) {
    month = month.substring(1);
  }
  let day = date.split('-')[2];
  if (day < 10) {
    day = day.substring(1);
  }
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();

  if (day == today.getDate() &&
    month == today.getMonth() - 1 &&
    year == today.getFullYear()) {
    return time.slice(0, -3);
  } else if (year == today.getFullYear()) {
    return monthArray[month-1] + ' ' + day.toString();
  } else {
    return year;
  }
}

/**
 * @param {object} email
 * @param {object} setEmail
 * @param {object} setOpenEmail
 */
function displayMail(email, setEmail, setOpenEmail) {
  setOpenEmail(true);
  setEmail(email);
}

/**
 * @return {object} JSX
 */
function Content() {
  const {mailbox, setEmail, setOpenEmail} =
    React.useContext(SharedContext);
  const [mail, setMail] = React.useState([]);
  const classes = useStyles();
  const sorted = mail.sort((a, b) =>
    Date.parse(b.received) - Date.parse(a.received));

  React.useEffect(() => {
    getmail(setMail, mailbox);
  }, [mailbox]);
  return (
    <Paper className={classes.paper}>
      <Toolbar/>
      {mailbox}
      <Typography className={classes.mailbox} noWrap='true'>
        <List>
          {sorted.map((email) => (
            <ListItem button
              key={email.id}
              onClick={() => displayMail(email, setEmail, setOpenEmail)}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
              // eslint-disable-next-line
                primary={<div align='left'>{email.from.name} <div align='right'>{fixDate(email.received)}</div></div>}
                secondary={
                  <div>
                    <div>{email.subject}</div>
                    <div text-overflow='ellipsis'>{email.content}</div>
                  </div>
                }/>
            </ListItem>
          ))}
        </List>
      </Typography>
    </Paper>
  );
}

export default Content;
