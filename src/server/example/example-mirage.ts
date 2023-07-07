import { faker } from '@faker-js/faker';
import { IUser } from '@models/example';
import { createServer, Factory, Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

const UserModel: ModelDefinition<IUser> = Model.extend({});

export function makeExampleServer() {
  return createServer({
    models: {
      user: UserModel
    },

    factories: {
      user: Factory.extend<Partial<IUser>>({
        get name() {
          return faker.person.fullName();
        },
        get username() {
          return faker.internet.userName();
        },
        get email() {
          return faker.internet.email();
        },
        get amount() {
          return faker.finance.amount();
        }
      })
    },

    seeds(server) {
      server.createList('user', 10);

      //brocken users
      server.create('user', {
        name: 'John Doe',
        username: 'johndoe',
        email: 'example@mail.com',
        amount: 'amount'
      });
      server.create('user', {
        name: 'Juan Dela Cruz',
        username: 'juandelacruz',
        email: 'juandelacruzmail.com',
        amount: '1000'
      });
    },

    routes() {
      this.namespace = 'api';

      this.resource('user');
    }
  });
}
