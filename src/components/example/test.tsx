import { Box, Button, Typography } from '@mui/material';
import { SnackStore } from '@store';
import { CounterStore } from '@store/example';
import { WithStores } from '@types';
import { withStores } from '@utils';
import { observer } from 'mobx-react-lite';

interface TestViewProps {
  text: string;
}

const stores = {
  counter: CounterStore,
  snack: SnackStore
};

const TestView: WithStores<typeof stores, TestViewProps> = ({ counter, text, snack }) => {
  return (
    <Box>
      <Typography>{text}</Typography>
      <Typography>{counter.count}</Typography>
      <Button color="success" onClick={() => counter.increment()}>
        Increment
      </Button>
      <Button color="error" onClick={() => counter.decrement()}>
        Decrement
      </Button>
      <Button
        onClick={() => snack.success(`This is a success message! Counter is ${counter.count}`)}
      >
        Open
      </Button>
    </Box>
  );
};

export const Test = withStores(stores)(observer(TestView));
