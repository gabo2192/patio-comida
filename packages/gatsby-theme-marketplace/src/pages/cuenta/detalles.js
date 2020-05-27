/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useAuth0 } from '../../../utils/auth';

import { ProtectedRoute } from '../../components/protected-route';
import Layout from '../../components/layout';

const Details = () => {
  const { user } = useAuth0();

  return (
    <ProtectedRoute>
      <Layout>
        <div>Hola {user && user.name && <span>{user.name}</span>}</div>
        <p>{user.sub}</p>
      </Layout>
    </ProtectedRoute>
  );
};

export default Details;
