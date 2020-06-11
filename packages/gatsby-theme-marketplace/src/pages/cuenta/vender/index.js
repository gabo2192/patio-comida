/**@jsx jsx */
import { jsx } from 'theme-ui';

import Layout from '../../../components/layout';
import { ProtectedRoute } from '../../../components/protected-route';
import { useAuth0 } from '../../../../utils/auth';
import MyStore from '../../../components/store/my-store';

export default () => {
  const { user, getTokenSilently } = useAuth0();
  return (
    <ProtectedRoute>
      <Layout>
        <div sx={{ variant: 'container.primary' }}>
          <MyStore user={user} getTokenSilently={getTokenSilently} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};
