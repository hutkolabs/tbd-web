import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { UserStore } from '@store/example';
import { WithStores } from '@types';
import { withStores } from '@utils';
import { observer } from 'mobx-react-lite';

import { UserCard } from './user';

const stores = {
  users: UserStore
};

export const UsersContainer: WithStores<typeof stores> = ({ users }) => {
  const { isLoading, error, data } = users.users.trinity;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mb: 8
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <>
          <div>{error.message}</div>
          <div>
            {
              //@ts-ignore
              error.cause.message
            }
          </div>
        </>
      ) : (
        <Grid container spacing={2}>
          {data.map(user => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        fullWidth
        onClick={() => {
          users.users.load();
        }}
      >
        Load
      </Button>
    </Box>
  );
};

export const Users = withStores(stores)(observer(UsersContainer));
