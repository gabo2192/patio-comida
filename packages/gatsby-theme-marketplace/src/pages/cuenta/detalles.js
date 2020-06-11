/**@jsx jsx */
import { jsx } from 'theme-ui';
import { useAuth0 } from '../../../utils/auth';

import { ProtectedRoute } from '../../components/protected-route';
import Layout from '../../components/layout';
import User from '../../components/user/user';

const Details = () => {
  const { user } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>{user && <User user={user} />}</Layout>
    </ProtectedRoute>
  );
};

export default Details;
