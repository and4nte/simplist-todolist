import React, { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import ClearIcon from '@mui/icons-material/Clear';

import { AlertColor } from '@mui/material/Alert';
import { TodoList as TodoListProps } from 'interfaces/TodoList.interface';

interface Props {
  lists: TodoListProps[];
  setLists: Dispatch<SetStateAction<TodoListProps[]>>;
  handleToast: (message: string, severity: AlertColor) => void;
}

function TodoList({ lists, setLists, handleToast }: Props) {
  const toggleCheck = (currentList: TodoListProps) => () => {
    setLists(
      lists.map(list => (list.id === currentList.id ? { ...currentList, isChecked: !currentList.isChecked } : list)),
    );
  };

  const removeList = (currentList: TodoListProps) => () => {
    setLists(lists.filter(item => item.id !== currentList.id));
    handleToast('삭제됨', 'error');
  };

  return lists.length > 0 ? (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {lists.map(item => {
        const labelId = `checkbox-list-label-${item.id}`;

        return (
          <ListItem
            key={item.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={removeList(item)}>
                <ClearIcon color="primary" />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={toggleCheck(item)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.isChecked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={item.todo}
                sx={{
                  ...(item.isChecked && { textDecorationLine: 'line-through' }),
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  ) : (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <InsertEmoticonIcon fontSize="large" />
        <PanToolAltIcon fontSize="large" />
      </div>
      <p>해야 할 일을 적어보세요.</p>
    </Box>
  );
}

export default TodoList;
