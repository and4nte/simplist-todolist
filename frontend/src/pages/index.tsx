import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Card, Snackbar, Alert, AlertColor, Fab, Zoom } from '@mui/material';
import { TodoList as TodoListProps } from 'interfaces/TodoList.interface';
import RefreshIcon from '@mui/icons-material/Refresh';
import TodoList from 'components/TodoList';
import TodoForm from 'components/TodoForm';
import usePrevious from 'hooks/usePrevious';

interface SnackbarMessage {
  message: string;
  severity: AlertColor;
}

function Home() {
  const [lists, setLists] = useState<TodoListProps[]>([]);
  const prevListsLength = usePrevious(lists.length);
  const scrollRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);
  const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
  const [showClear, setShowClear] = useState(false);

  // Update lists
  useEffect(() => {
    // scroll to bottom when list added in Card component
    const prevLength = prevListsLength || 0;
    if (scrollRef.current && lists.length > prevLength) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    // pop clear button when some lists checked
    const hasCheckedList = lists.some(list => list.isChecked);
    setShowClear(hasCheckedList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  // Update toast
  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack(prev => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = () => setOpen(false);

  const handleToast = (message: string, severity: AlertColor) => {
    setSnackPack(prev => [...prev, { message, severity }]);
  };

  const handleExited = () => setMessageInfo(undefined);

  const clearCheckedList = () => {
    console.log('hey');
    setLists(lists.filter(item => !item.isChecked));
    handleToast('삭제됨', 'error');
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Dongle',
          fontSize: '4rem',
        }}
        align="center"
      >
        To-Do List
      </Typography>
      <Box display="flex" padding="0 15px" marginBottom="30px" width="100%">
        <TodoForm lists={lists} setLists={setLists} handleToast={handleToast} />
      </Box>
      <Card
        sx={{
          display: 'flex',
          fontSize: '1.5rem',
          minHeight: '55vh' /* '300px' */,
          maxHeight: '60vh',
          overflowY: 'auto',
          border: 3,
          borderColor: 'divider',
          '&::-webkit-scrollbar': {
            width: '0.4rem',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: '50px',
          },
        }}
        variant="outlined"
        ref={scrollRef}
      >
        <TodoList lists={lists} setLists={setLists} handleToast={handleToast} />
      </Card>
      <Zoom in={showClear}>
        <Fab
          onClick={clearCheckedList}
          color="primary"
          aria-label="clear"
          size="small"
          sx={{
            position: 'absolute',
            top: { md: '170px', xs: '10px' },
            right: { md: '-80px', xs: '20px' },
            mt: { md: '0', xs: '20px' },
          }}
        >
          <RefreshIcon />
        </Fab>
      </Zoom>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        TransitionProps={{ onExited: handleExited }}
        key={messageInfo ? 'snackbar' : undefined}
      >
        <Alert
          onClose={handleClose}
          severity={messageInfo?.severity}
          sx={{ width: '100%', fontFamily: 'Dongle', fontSize: '1.2rem' }}
        >
          {messageInfo?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
