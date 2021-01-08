import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
// import {makeStyles} from '@material-ui/core/styles';
import SharedContext from './SharedContext';

const boxes = [
  {name: 'inbox', icon: <MailIcon/>},
  {name: 'trash', icon: <DeleteIcon/>},
  {name: 'sent', icon: <SendIcon/>},
];
const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: 'gray',
  },
  not: {
    color: 'inherit',
  },
}));

// /**
//  * @param {state} classes
//  * @param {bool} disabled
//  * @return {bool}
//  */
// function ishighlight(classes, disabled) {
//   // eslint-disable-next-line
//   return disabled ? classes.selected : classes.not;
// }
// {(box.name === mailbox)
//   ?
// }
// classes={ishighlight(classes, disabled)}
/**
 * @return {object} JSX
 */
function MailboxList() {
  const {mailbox, selectMailbox} = React.useContext(SharedContext);
  const classes = useStyles();
  return (
    <div>
      <Toolbar />
      <List>
        {boxes.map((box) => (
          <ListItem button
            key={box.name}
            disabled={mailbox == box.name}
            onClick={() => selectMailbox(box.name)}
            className={mailbox == box.name ? classes.selected : classes.not}
          >
            <ListItemIcon>
              {box.icon}
            </ListItemIcon>
            <ListItemText primary={box.name}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default MailboxList;
