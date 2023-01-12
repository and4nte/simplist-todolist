import { Dispatch, SetStateAction, useRef, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AlertColor } from '@mui/material/Alert';

import { TodoList as TodoListProps } from 'interfaces/TodoList.interface';
import useInput from 'hooks/useInput';

interface Props {
  lists: TodoListProps[];
  setLists: Dispatch<SetStateAction<TodoListProps[]>>;
  handleToast: (message: string, severity: AlertColor) => void;
}

const formStyle = { display: 'flex', width: '100%' };

function TodoForm({ lists, setLists, handleToast }: Props) {
  const [todo, onChangeTodo, setTodo] = useInput('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitAddList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation check: is blank
    if (todo.trim() === '') {
      // eslint-disable-next-line no-alert
      alert('해야할 일을 작성해주세요.');
      inputRef.current?.focus();
      return;
    }

    // add to list then clear and focus on todo input.
    setLists([...lists, { id: Date.now(), isChecked: false, todo }]);
    setTodo('');
    inputRef.current?.focus();
    handleToast('추가됨', 'success');
  };

  return (
    <form style={formStyle} onSubmit={onSubmitAddList}>
      <TextField
        value={todo}
        onChange={onChangeTodo}
        inputRef={inputRef}
        id="outlined-basic"
        size="small"
        variant="outlined"
        fullWidth
      />
      <Box marginLeft="15px">
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
}

export default TodoForm;
