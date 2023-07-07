import { Layout } from '@layout';
import { Sandwich } from '@providers/sandwich';
import { Router } from '@router';

export const App = () => {
  return (
    <Sandwich>
      <Layout>
        <Router />
      </Layout>
    </Sandwich>
  );
};
