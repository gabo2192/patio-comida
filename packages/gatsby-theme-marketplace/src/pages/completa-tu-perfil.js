/**@jsx jsx */
import { useEffect } from 'react';
import { jsx } from 'theme-ui';

import { useAuth0 } from '../../utils/auth';

import Layout from '../components/layout';
import FormUser from '../components/form/form-user';
import Loading from '../components/ui/loading';
import { ProtectedRoute } from '../components/protected-route';

const Continue = () => {
  const { user, getTokenSilently } = useAuth0();
  return (
    <Layout>
      <ProtectedRoute>
        <div sx={{ variant: 'container.primary' }}>
          {user && <FormUser user={user} getTokenSilently={getTokenSilently} />}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Continue;
