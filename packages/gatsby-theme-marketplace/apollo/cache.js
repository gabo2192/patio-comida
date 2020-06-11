import { InMemoryCache } from '@apollo/client';
import { GET_STORE } from './queries';

export const cache = new InMemoryCache();

/* const writeInitialData = () => {
  cache.writeQuery({
    query: GET_STORE,
    data: {
      store: {
        __typename: 'Store',
        name: '',
        phone: '',
        logo: '',
        image: '',
        email: '',
        address: '',
        lat: '',
        lng: '',
        categories: [],
        services: [],
      },
    },
  });
};

writeInitialData();
client.onResetStore(writeInitialData);
 */
